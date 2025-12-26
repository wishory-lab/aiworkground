# WorkflowAI Backend API Server
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from contextlib import asynccontextmanager
import uvicorn
import os
from datetime import datetime
import json
import asyncio
from typing import Optional, List, Dict, Any
import httpx
from supabase import create_client, Client
from pydantic import BaseModel, Field
import jwt
from cryptography.hazmat.primitives import serialization
import logging

# Environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Security
security = HTTPBearer()

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting WorkflowAI Backend Server...")
    yield
    logger.info("Shutting down WorkflowAI Backend Server...")

app = FastAPI(
    title="WorkflowAI API",
    description="3-in-1 AI Productivity Platform Backend",
    version="1.0.0",
    lifespan=lifespan
)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://workflowai.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "*.workflowai.dev", "api.workflowai.dev"]
)

# Pydantic Models
class TaskCreate(BaseModel):
    type: str = Field(..., regex="^(marketing|design|development)$")
    category: str
    title: str = Field(..., max_length=500)
    description: Optional[str] = None
    input_data: Optional[Dict[str, Any]] = None
    priority: str = Field(default="normal", regex="^(low|normal|high|urgent)$")
    team_id: Optional[str] = None

class TaskResponse(BaseModel):
    id: str
    user_id: str
    type: str
    category: str
    title: str
    description: Optional[str]
    status: str
    progress: int
    created_at: datetime
    estimated_duration: Optional[int]
    
class UserProfile(BaseModel):
    id: str
    clerk_id: str
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    subscription_tier: str
    total_tasks_completed: int
    total_credits_used: int

class TeamCreate(BaseModel):
    name: str = Field(..., max_length=200)
    description: Optional[str] = None

# Authentication
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # Verify Clerk JWT token
        # In production, use Clerk's public key to verify
        payload = jwt.decode(token, CLERK_SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(payload: dict = Depends(verify_token)):
    clerk_id = payload.get('sub')
    if not clerk_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    # Get user from database
    result = supabase.table('users').select('*').eq('clerk_id', clerk_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return result.data

# Health Check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

# User Management
@app.get("/users/profile", response_model=UserProfile)
async def get_user_profile(current_user: dict = Depends(get_current_user)):
    return UserProfile(**current_user)

@app.put("/users/profile")
async def update_user_profile(
    updates: Dict[str, Any],
    current_user: dict = Depends(get_current_user)
):
    # Update user profile
    allowed_fields = ['first_name', 'last_name', 'avatar_url']
    update_data = {k: v for k, v in updates.items() if k in allowed_fields}
    
    result = supabase.table('users').update(update_data).eq('id', current_user['id']).execute()
    return {"message": "Profile updated successfully"}

# Team Management
@app.post("/teams")
async def create_team(
    team_data: TeamCreate,
    current_user: dict = Depends(get_current_user)
):
    # Create team
    team_insert = {
        "name": team_data.name,
        "slug": team_data.name.lower().replace(" ", "-"),
        "description": team_data.description,
        "owner_id": current_user['id']
    }
    
    team_result = supabase.table('teams').insert(team_insert).execute()
    team = team_result.data[0]
    
    # Add owner as team member
    member_insert = {
        "team_id": team['id'],
        "user_id": current_user['id'],
        "role": "owner",
        "permissions": ["all"]
    }
    
    supabase.table('team_members').insert(member_insert).execute()
    
    return team

@app.get("/teams")
async def get_user_teams(current_user: dict = Depends(get_current_user)):
    result = supabase.table('team_members').select(
        '*, teams(*)'
    ).eq('user_id', current_user['id']).execute()
    
    return [member['teams'] for member in result.data]

# AI Task Management
@app.post("/tasks", response_model=TaskResponse)
async def create_ai_task(
    task_data: TaskCreate,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user)
):
    # Create task in database
    task_insert = {
        "user_id": current_user['id'],
        "team_id": task_data.team_id,
        "type": task_data.type,
        "category": task_data.category,
        "title": task_data.title,
        "description": task_data.description,
        "input_data": task_data.input_data,
        "priority": task_data.priority,
        "status": "pending"
    }
    
    result = supabase.table('ai_tasks').insert(task_insert).execute()
    task = result.data[0]
    
    # Process task in background
    background_tasks.add_task(process_ai_task, task['id'], task_data.type)
    
    return TaskResponse(**task)

@app.get("/tasks", response_model=List[TaskResponse])
async def get_user_tasks(
    limit: int = 20,
    offset: int = 0,
    status: Optional[str] = None,
    type: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    query = supabase.table('ai_tasks').select('*').eq('user_id', current_user['id'])
    
    if status:
        query = query.eq('status', status)
    if type:
        query = query.eq('type', type)
        
    result = query.order('created_at', desc=True).range(offset, offset + limit - 1).execute()
    
    return [TaskResponse(**task) for task in result.data]

@app.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: str,
    current_user: dict = Depends(get_current_user)
):
    result = supabase.table('ai_tasks').select('*').eq('id', task_id).eq('user_id', current_user['id']).single().execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return TaskResponse(**result.data)

@app.get("/tasks/{task_id}/results")
async def get_task_results(
    task_id: str,
    current_user: dict = Depends(get_current_user)
):
    # Verify task ownership
    task_result = supabase.table('ai_tasks').select('id').eq('id', task_id).eq('user_id', current_user['id']).single().execute()
    if not task_result.data:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Get results
    results = supabase.table('task_results').select('*').eq('task_id', task_id).execute()
    return results.data

# AI Processing Functions
async def process_ai_task(task_id: str, task_type: str):
    """Background task to process AI requests"""
    try:
        # Update task status
        supabase.table('ai_tasks').update({
            'status': 'processing',
            'started_at': datetime.now().isoformat()
        }).eq('id', task_id).execute()
        
        # Get task details
        task_result = supabase.table('ai_tasks').select('*').eq('id', task_id).single().execute()
        task = task_result.data
        
        # Route to appropriate MCP server
        if task_type == 'marketing':
            result = await process_marketing_task(task)
        elif task_type == 'design':
            result = await process_design_task(task)
        elif task_type == 'development':
            result = await process_development_task(task)
        else:
            raise ValueError(f"Unknown task type: {task_type}")
        
        # Save result
        result_insert = {
            "task_id": task_id,
            "result_type": result['type'],
            "content": result.get('content'),
            "file_url": result.get('file_url'),
            "metadata": result.get('metadata', {}),
            "quality_score": result.get('quality_score', 0.8)
        }
        
        supabase.table('task_results').insert(result_insert).execute()
        
        # Update task as completed
        supabase.table('ai_tasks').update({
            'status': 'completed',
            'progress': 100,
            'completed_at': datetime.now().isoformat()
        }).eq('id', task_id).execute()
        
        # Update user stats
        supabase.table('users').update({
            'total_tasks_completed': supabase.table('users').select('total_tasks_completed').eq('id', task['user_id']).single().execute().data['total_tasks_completed'] + 1
        }).eq('id', task['user_id']).execute()
        
    except Exception as e:
        logger.error(f"Error processing task {task_id}: {str(e)}")
        supabase.table('ai_tasks').update({
            'status': 'failed',
            'progress': 0
        }).eq('id', task_id).execute()

async def process_marketing_task(task: dict) -> dict:
    """Process marketing AI tasks"""
    # Integrate with MCP Marketing Server or direct API calls
    if task['category'] == 'blog_post':
        # Generate blog post using OpenAI
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4",
                    "messages": [
                        {"role": "system", "content": "You are a professional content writer."},
                        {"role": "user", "content": f"Write a blog post about: {task['title']}\nDescription: {task['description']}"}
                    ],
                    "max_tokens": 2000
                }
            )
            
            ai_response = response.json()
            content = ai_response['choices'][0]['message']['content']
            
            return {
                "type": "text",
                "content": content,
                "metadata": {
                    "word_count": len(content.split()),
                    "model_used": "gpt-4"
                }
            }
    
    # Add more marketing task types here
    return {"type": "text", "content": "Marketing task completed"}

async def process_design_task(task: dict) -> dict:
    """Process design AI tasks"""
    if task['category'] == 'logo_design':
        # Generate logo using DALL-E
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/images/generations",
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "dall-e-3",
                    "prompt": f"Professional logo design for: {task['title']}. {task['description']}. Clean, modern, minimalist style.",
                    "n": 1,
                    "size": "1024x1024",
                    "quality": "hd"
                }
            )
            
            ai_response = response.json()
            image_url = ai_response['data'][0]['url']
            
            return {
                "type": "image",
                "file_url": image_url,
                "metadata": {
                    "dimensions": "1024x1024",
                    "model_used": "dall-e-3"
                }
            }
    
    return {"type": "image", "content": "Design task completed"}

async def process_development_task(task: dict) -> dict:
    """Process development AI tasks"""
    if task['category'] == 'code_review':
        # Code review using Claude
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "Authorization": f"Bearer {ANTHROPIC_API_KEY}",
                    "Content-Type": "application/json",
                    "anthropic-version": "2023-06-01"
                },
                json={
                    "model": "claude-3-sonnet-20240229",
                    "max_tokens": 1500,
                    "messages": [
                        {
                            "role": "user",
                            "content": f"Review this code and provide feedback:\n\n{task.get('input_data', {}).get('code', 'No code provided')}\n\nFocus on: security, performance, best practices, and potential bugs."
                        }
                    ]
                }
            )
            
            ai_response = response.json()
            review_content = ai_response['content'][0]['text']
            
            return {
                "type": "text",
                "content": review_content,
                "metadata": {
                    "model_used": "claude-3-sonnet",
                    "review_type": "code_review"
                }
            }
    
    return {"type": "text", "content": "Development task completed"}

# Platform Integrations
@app.post("/integrations/{platform}/connect")
async def connect_platform(
    platform: str,
    integration_data: Dict[str, Any],
    current_user: dict = Depends(get_current_user)
):
    # Store platform integration
    integration_insert = {
        "user_id": current_user['id'],
        "platform": platform,
        "access_token": integration_data.get('access_token'),  # Should be encrypted
        "scopes": integration_data.get('scopes', []),
        "is_active": True
    }
    
    result = supabase.table('platform_integrations').upsert(integration_insert).execute()
    return {"message": f"{platform} integration connected successfully"}

@app.get("/integrations")
async def get_user_integrations(current_user: dict = Depends(get_current_user)):
    result = supabase.table('platform_integrations').select(
        'platform, is_active, created_at, last_sync_at'
    ).eq('user_id', current_user['id']).execute()
    
    return result.data

# Statistics and Analytics
@app.get("/dashboard/stats")
async def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    # Get user task statistics
    tasks_result = supabase.table('ai_tasks').select(
        'status, type'
    ).eq('user_id', current_user['id']).execute()
    
    tasks = tasks_result.data
    
    stats = {
        "total_tasks": len(tasks),
        "completed_tasks": len([t for t in tasks if t['status'] == 'completed']),
        "pending_tasks": len([t for t in tasks if t['status'] == 'pending']),
        "processing_tasks": len([t for t in tasks if t['status'] == 'processing']),
        "tasks_by_type": {
            "marketing": len([t for t in tasks if t['type'] == 'marketing']),
            "design": len([t for t in tasks if t['type'] == 'design']),
            "development": len([t for t in tasks if t['type'] == 'development'])
        },
        "success_rate": round((len([t for t in tasks if t['status'] == 'completed']) / max(len(tasks), 1)) * 100, 1)
    }
    
    return stats

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True if os.getenv("ENVIRONMENT") == "development" else False,
        workers=1 if os.getenv("ENVIRONMENT") == "development" else 4
    )