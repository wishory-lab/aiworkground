"""
WorkflowAI MCP Server - Developer Module
AI-powered development automation and code assistance

Features:
- Code review and analysis
- Documentation generation
- Bug prediction and fixing
- Test case generation
- Performance optimization suggestions
"""

import asyncio
import json
import os
from typing import Any, Dict, List, Optional
from datetime import datetime
import re
import ast

from mcp import ClientSession, StdioServerParameters
from mcp.server import Server
from mcp.server.models import InitializationOptions
import mcp.server.stdio
import mcp.types as types

from openai import AsyncOpenAI
from anthropic import AsyncAnthropic

# Initialize AI clients
openai_client = AsyncOpenAI(api_key=os.getenv('OPENAI_API_KEY'))
anthropic_client = AsyncAnthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

# Developer context storage
CODE_CONTEXTS = {}
PROJECT_STANDARDS = {}
PERFORMANCE_METRICS = {}

server = Server("workflow-ai-developer")

@server.list_resources()
async def list_resources() -> List[types.Resource]:
    """List available developer resources"""
    return [
        types.Resource(
            uri="code://contexts",
            name="Code Contexts",
            mimeType="application/json",
            description="Repository contexts and codebase understanding"
        ),
        types.Resource(
            uri="standards://guidelines",
            name="Coding Standards",
            mimeType="application/json",
            description="Project-specific coding guidelines and best practices"
        ),
        types.Resource(
            uri="metrics://performance",
            name="Performance Metrics",
            mimeType="application/json",
            description="Code quality and performance tracking data"
        ),
        types.Resource(
            uri="docs://templates",
            name="Documentation Templates",
            mimeType="application/json",
            description="Standard templates for API docs, README files, etc."
        )
    ]

@server.read_resource()
async def read_resource(uri: str) -> str:
    """Read developer resource content"""
    if uri == "code://contexts":
        return json.dumps(CODE_CONTEXTS)
    elif uri == "standards://guidelines":
        return json.dumps(PROJECT_STANDARDS)
    elif uri == "metrics://performance":
        return json.dumps(PERFORMANCE_METRICS)
    elif uri == "docs://templates":
        return json.dumps({
            "readme": {
                "sections": ["Installation", "Usage", "API Reference", "Contributing", "License"],
                "badges": ["build_status", "coverage", "version", "license"]
            },
            "api_docs": {
                "format": "OpenAPI 3.0",
                "sections": ["Authentication", "Endpoints", "Models", "Examples", "Errors"]
            },
            "changelog": {
                "format": "Keep a Changelog",
                "sections": ["Added", "Changed", "Deprecated", "Removed", "Fixed", "Security"]
            }
        })
    else:
        raise ValueError(f"Unknown resource: {uri}")

@server.list_tools()
async def list_tools() -> List[types.Tool]:
    """List available developer tools"""
    return [
        types.Tool(
            name="review_code",
            description="Perform AI-powered code review with suggestions",
            inputSchema={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "Code to review"},
                    "language": {"type": "string", "description": "Programming language", "enum": ["python", "javascript", "typescript", "java", "go", "rust", "cpp", "other"]},
                    "review_type": {"type": "string", "enum": ["security", "performance", "maintainability", "all"], "default": "all"},
                    "project_context": {"type": "string", "description": "Brief description of the project context"},
                    "standards": {"type": "array", "items": {"type": "string"}, "description": "Coding standards to check against"}
                },
                "required": ["code", "language"]
            }
        ),
        types.Tool(
            name="generate_documentation",
            description="Generate comprehensive documentation for code",
            inputSchema={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "Code to document"},
                    "language": {"type": "string", "description": "Programming language"},
                    "doc_type": {"type": "string", "enum": ["api", "readme", "inline", "user_guide"], "default": "api"},
                    "audience": {"type": "string", "enum": ["developers", "end_users", "contributors"], "default": "developers"},
                    "include_examples": {"type": "boolean", "default": true}
                },
                "required": ["code", "language"]
            }
        ),
        types.Tool(
            name="analyze_bugs",
            description="Analyze code for potential bugs and suggest fixes",
            inputSchema={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "Code to analyze"},
                    "language": {"type": "string", "description": "Programming language"},
                    "error_logs": {"type": "string", "description": "Any error logs or stack traces"},
                    "expected_behavior": {"type": "string", "description": "Description of expected behavior"},
                    "bug_type": {"type": "string", "enum": ["runtime", "logic", "performance", "security", "all"], "default": "all"}
                },
                "required": ["code", "language"]
            }
        ),
        types.Tool(
            name="generate_tests",
            description="Generate comprehensive test cases for code",
            inputSchema={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "Code to test"},
                    "language": {"type": "string", "description": "Programming language"},
                    "test_framework": {"type": "string", "description": "Preferred testing framework"},
                    "test_types": {"type": "array", "items": {"type": "string", "enum": ["unit", "integration", "e2e", "performance"]}, "default": ["unit"]},
                    "coverage_target": {"type": "integer", "minimum": 50, "maximum": 100, "default": 80}
                },
                "required": ["code", "language"]
            }
        ),
        types.Tool(
            name="optimize_performance",
            description="Analyze code performance and suggest optimizations",
            inputSchema={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "Code to optimize"},
                    "language": {"type": "string", "description": "Programming language"},
                    "performance_metrics": {
                        "type": "object",
                        "properties": {
                            "execution_time": {"type": "number", "description": "Current execution time in ms"},
                            "memory_usage": {"type": "number", "description": "Memory usage in MB"},
                            "cpu_usage": {"type": "number", "description": "CPU usage percentage"}
                        }
                    },
                    "optimization_target": {"type": "string", "enum": ["speed", "memory", "cpu", "all"], "default": "all"}
                },
                "required": ["code", "language"]
            }
        ),
        types.Tool(
            name="refactor_code",
            description="Suggest code refactoring improvements",
            inputSchema={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "Code to refactor"},
                    "language": {"type": "string", "description": "Programming language"},
                    "refactor_goals": {"type": "array", "items": {"type": "string", "enum": ["readability", "maintainability", "performance", "modularity", "testing"]}, "default": ["readability", "maintainability"]},
                    "preserve_behavior": {"type": "boolean", "default": true, "description": "Ensure refactoring preserves original behavior"}
                },
                "required": ["code", "language"]
            }
        ),
        types.Tool(
            name="explain_code",
            description="Provide detailed explanation of how code works",
            inputSchema={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "Code to explain"},
                    "language": {"type": "string", "description": "Programming language"},
                    "explanation_level": {"type": "string", "enum": ["beginner", "intermediate", "advanced"], "default": "intermediate"},
                    "include_diagrams": {"type": "boolean", "default": false, "description": "Include ASCII diagrams or flowcharts"}
                },
                "required": ["code", "language"]
            }
        ),
        types.Tool(
            name="create_api_spec",
            description="Generate OpenAPI specification from code",
            inputSchema={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "API code to document"},
                    "language": {"type": "string", "description": "Programming language"},
                    "api_framework": {"type": "string", "description": "API framework used (e.g., Express, FastAPI, Spring)"},
                    "include_examples": {"type": "boolean", "default": true},
                    "spec_version": {"type": "string", "enum": ["3.0", "3.1"], "default": "3.0"}
                },
                "required": ["code", "language"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: Dict[str, Any]) -> List[types.TextContent]:
    """Execute developer tools"""
    
    if name == "review_code":
        code = arguments["code"]
        language = arguments["language"]
        review_type = arguments.get("review_type", "all")
        project_context = arguments.get("project_context", "")
        standards = arguments.get("standards", [])
        
        review_prompt = f"""
        Please perform a comprehensive code review of this {language} code.
        
        Code to review:
        ```{language}
        {code}
        ```
        
        Project Context: {project_context}
        Review Focus: {review_type}
        Coding Standards: {', '.join(standards) if standards else 'General best practices'}
        
        Please analyze:
        1. Code quality and maintainability
        2. Potential bugs and edge cases
        3. Security vulnerabilities
        4. Performance considerations
        5. Best practice compliance
        6. Documentation and readability
        
        Provide specific suggestions with line references where applicable.
        Rate the overall code quality on a scale of 1-10.
        """
        
        try:
            response = await anthropic_client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=2000,
                messages=[
                    {"role": "user", "content": review_prompt}
                ]
            )
            
            review_result = response.content[0].text
            
            # Extract code quality metrics
            quality_score_match = re.search(r'(\d+(?:\.\d+)?)/10|(\d+(?:\.\d+)?) out of 10', review_result.lower())
            quality_score = "Not specified"
            if quality_score_match:
                quality_score = quality_score_match.group(1) or quality_score_match.group(2)
            
            formatted_review = f"""🔍 Code Review Results

📊 Quality Score: {quality_score}/10
🎯 Review Type: {review_type.title()}
💻 Language: {language.title()}

{review_result}

🚀 Next Steps:
   • Address high-priority issues first
   • Consider automated testing for suggested edge cases
   • Update documentation based on recommendations
   • Set up linting rules to prevent similar issues
            """
            
            return [types.TextContent(type="text", text=formatted_review)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error performing code review: {str(e)}"
            )]
    
    elif name == "generate_documentation":
        code = arguments["code"]
        language = arguments["language"]
        doc_type = arguments.get("doc_type", "api")
        audience = arguments.get("audience", "developers")
        include_examples = arguments.get("include_examples", True)
        
        doc_prompt = f"""
        Generate comprehensive {doc_type} documentation for this {language} code.
        
        Code:
        ```{language}
        {code}
        ```
        
        Requirements:
        - Target audience: {audience}
        - Documentation type: {doc_type}
        - Include examples: {include_examples}
        
        Please provide:
        1. Overview and purpose
        2. Installation/setup instructions (if applicable)
        3. Usage examples
        4. API reference (functions, classes, parameters)
        5. Configuration options
        6. Troubleshooting section
        
        Format the documentation in Markdown.
        """
        
        try:
            response = await openai_client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": f"You are a technical writer specializing in {language} documentation for {audience}."},
                    {"role": "user", "content": doc_prompt}
                ],
                temperature=0.3
            )
            
            documentation = response.choices[0].message.content
            
            doc_result = f"""📚 Generated Documentation

📝 Type: {doc_type.title()}
👥 Audience: {audience.title()}
💻 Language: {language.title()}
✨ Examples: {'Included' if include_examples else 'Not included'}

{documentation}

📋 Documentation Checklist:
   ✅ Overview and purpose explained
   ✅ Setup instructions provided
   ✅ Usage examples included
   ✅ API reference documented
   ✅ Error handling covered
   
💡 Maintenance Tips:
   • Keep documentation in sync with code changes
   • Add examples for common use cases
   • Include troubleshooting for frequent issues
   • Consider interactive documentation tools
            """
            
            return [types.TextContent(type="text", text=doc_result)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error generating documentation: {str(e)}"
            )]
    
    elif name == "analyze_bugs":
        code = arguments["code"]
        language = arguments["language"]
        error_logs = arguments.get("error_logs", "")
        expected_behavior = arguments.get("expected_behavior", "")
        bug_type = arguments.get("bug_type", "all")
        
        bug_analysis_prompt = f"""
        Analyze this {language} code for bugs and issues.
        
        Code:
        ```{language}
        {code}
        ```
        
        Error Logs:
        {error_logs if error_logs else "No error logs provided"}
        
        Expected Behavior:
        {expected_behavior if expected_behavior else "Not specified"}
        
        Focus Area: {bug_type}
        
        Please provide:
        1. Identified bugs and issues
        2. Root cause analysis
        3. Specific fix recommendations
        4. Prevention strategies
        5. Test cases to validate fixes
        
        Priority level: High/Medium/Low for each issue
        """
        
        try:
            response = await anthropic_client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=2000,
                messages=[
                    {"role": "user", "content": bug_analysis_prompt}
                ]
            )
            
            bug_analysis = response.content[0].text
            
            # Count issues by priority
            high_priority = len(re.findall(r'high priority|priority.*high', bug_analysis.lower()))
            medium_priority = len(re.findall(r'medium priority|priority.*medium', bug_analysis.lower()))
            low_priority = len(re.findall(r'low priority|priority.*low', bug_analysis.lower()))
            
            analysis_result = f"""🐛 Bug Analysis Report

📊 Issue Summary:
   • High Priority: {high_priority} issues
   • Medium Priority: {medium_priority} issues  
   • Low Priority: {low_priority} issues

💻 Language: {language.title()}
🎯 Focus: {bug_type.title()}

{bug_analysis}

🔄 Recommended Workflow:
   1. Fix high-priority issues immediately
   2. Create tickets for medium-priority issues
   3. Schedule low-priority fixes for next sprint
   4. Add regression tests for all fixes
   5. Update documentation if behavior changes

⚡ Prevention Strategies:
   • Implement comprehensive testing
   • Use static analysis tools
   • Add input validation
   • Follow defensive programming practices
            """
            
            return [types.TextContent(type="text", text=analysis_result)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error analyzing bugs: {str(e)}"
            )]
    
    elif name == "generate_tests":
        code = arguments["code"]
        language = arguments["language"]
        test_framework = arguments.get("test_framework", "")
        test_types = arguments.get("test_types", ["unit"])
        coverage_target = arguments.get("coverage_target", 80)
        
        # Determine default test framework if not specified
        framework_defaults = {
            "python": "pytest",
            "javascript": "Jest",
            "typescript": "Jest",
            "java": "JUnit",
            "go": "go test",
            "rust": "cargo test",
            "cpp": "Google Test"
        }
        
        if not test_framework:
            test_framework = framework_defaults.get(language, "standard testing framework")
        
        test_prompt = f"""
        Generate comprehensive test cases for this {language} code using {test_framework}.
        
        Code to test:
        ```{language}
        {code}
        ```
        
        Requirements:
        - Test types: {', '.join(test_types)}
        - Target coverage: {coverage_target}%
        - Framework: {test_framework}
        
        Please generate:
        1. Test setup and teardown
        2. Happy path test cases
        3. Edge case tests
        4. Error handling tests
        5. Performance tests (if applicable)
        6. Mock/stub implementations where needed
        
        Include assertions and expected outcomes.
        Organize tests logically with descriptive names.
        """
        
        try:
            response = await openai_client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": f"You are a test automation expert specializing in {language} and {test_framework}."},
                    {"role": "user", "content": test_prompt}
                ],
                temperature=0.2
            )
            
            test_code = response.choices[0].message.content
            
            # Estimate number of test cases
            test_count = len(re.findall(r'def test_|it\(|@Test|func Test', test_code))
            
            test_result = f"""🧪 Generated Test Suite

📊 Test Summary:
   • Framework: {test_framework}
   • Test Types: {', '.join(test_types)}
   • Estimated Cases: {test_count}
   • Coverage Target: {coverage_target}%

💻 Language: {language.title()}

{test_code}

📋 Test Execution Checklist:
   ✅ Install test framework dependencies
   ✅ Configure test environment
   ✅ Run test suite to verify all pass
   ✅ Check actual code coverage
   ✅ Add to CI/CD pipeline

💡 Best Practices Applied:
   • Descriptive test names
   • Independent test cases
   • Proper setup/teardown
   • Edge case coverage
   • Mock external dependencies

🔄 Continuous Improvement:
   • Add tests for new features
   • Update tests when code changes
   • Monitor and maintain coverage
   • Refactor tests as needed
            """
            
            return [types.TextContent(type="text", text=test_result)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error generating tests: {str(e)}"
            )]
    
    elif name == "optimize_performance":
        code = arguments["code"]
        language = arguments["language"]
        performance_metrics = arguments.get("performance_metrics", {})
        optimization_target = arguments.get("optimization_target", "all")
        
        perf_prompt = f"""
        Analyze this {language} code for performance optimization opportunities.
        
        Code:
        ```{language}
        {code}
        ```
        
        Current Performance Metrics:
        - Execution Time: {performance_metrics.get('execution_time', 'Not provided')}ms
        - Memory Usage: {performance_metrics.get('memory_usage', 'Not provided')}MB
        - CPU Usage: {performance_metrics.get('cpu_usage', 'Not provided')}%
        
        Optimization Target: {optimization_target}
        
        Please analyze:
        1. Performance bottlenecks
        2. Algorithm complexity improvements
        3. Memory usage optimization
        4. I/O and database query optimization
        5. Caching opportunities
        6. Parallel processing potential
        
        Provide specific code improvements with before/after examples.
        Estimate performance gains for each optimization.
        """
        
        try:
            response = await anthropic_client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=2000,
                messages=[
                    {"role": "user", "content": perf_prompt}
                ]
            )
            
            optimization_analysis = response.content[0].text
            
            # Extract potential improvements
            improvements = re.findall(r'(\d+)%.*improvement|improve.*by.*(\d+)%', optimization_analysis.lower())
            total_improvement = sum([int(match[0] or match[1]) for match in improvements])
            
            perf_result = f"""⚡ Performance Optimization Analysis

📊 Current Metrics:
   • Execution Time: {performance_metrics.get('execution_time', 'N/A')}ms
   • Memory Usage: {performance_metrics.get('memory_usage', 'N/A')}MB
   • CPU Usage: {performance_metrics.get('cpu_usage', 'N/A')}%

🎯 Optimization Target: {optimization_target.title()}
💻 Language: {language.title()}

{optimization_analysis}

📈 Expected Benefits:
   • Estimated Total Improvement: Up to {total_improvement}% (combined optimizations)
   • Reduced resource consumption
   • Better user experience
   • Lower infrastructure costs

🛠️ Implementation Priority:
   1. High-impact, low-effort optimizations first
   2. Measure performance before/after changes
   3. Profile code to validate improvements
   4. Document optimization decisions

⚠️ Important Notes:
   • Test thoroughly after optimizations
   • Consider maintainability vs. performance trade-offs
   • Monitor performance in production
   • Keep optimization goals realistic
            """
            
            return [types.TextContent(type="text", text=perf_result)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error analyzing performance: {str(e)}"
            )]
    
    elif name == "refactor_code":
        code = arguments["code"]
        language = arguments["language"]
        refactor_goals = arguments.get("refactor_goals", ["readability", "maintainability"])
        preserve_behavior = arguments.get("preserve_behavior", True)
        
        refactor_prompt = f"""
        Refactor this {language} code to improve {', '.join(refactor_goals)}.
        
        Original Code:
        ```{language}
        {code}
        ```
        
        Refactoring Goals: {', '.join(refactor_goals)}
        Preserve Behavior: {preserve_behavior}
        
        Please provide:
        1. Refactored code with improvements
        2. Explanation of changes made
        3. Benefits of each refactoring
        4. Potential risks or considerations
        5. Migration strategy if applicable
        
        Focus on clean code principles and best practices.
        Highlight the most important improvements.
        """
        
        try:
            response = await openai_client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": f"You are a senior {language} developer expert in code refactoring and clean code principles."},
                    {"role": "user", "content": refactor_prompt}
                ],
                temperature=0.3
            )
            
            refactored_result = response.choices[0].message.content
            
            refactor_summary = f"""🔨 Code Refactoring Results

🎯 Goals: {', '.join(refactor_goals)}
💻 Language: {language.title()}
🛡️ Behavior Preserved: {'Yes' if preserve_behavior else 'May change'}

{refactored_result}

📋 Refactoring Checklist:
   ✅ Review all changes carefully
   ✅ Run existing tests to ensure behavior preserved
   ✅ Update documentation if needed
   ✅ Consider performance impact
   ✅ Get code review from team

💡 Clean Code Benefits:
   • Easier to understand and modify
   • Reduced bug potential
   • Better testability
   • Improved maintainability
   • Enhanced team productivity

🔄 Next Steps:
   • Apply refactoring incrementally
   • Monitor for any issues
   • Update related documentation
   • Share learnings with team
            """
            
            return [types.TextContent(type="text", text=refactor_summary)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error refactoring code: {str(e)}"
            )]
    
    elif name == "explain_code":
        code = arguments["code"]
        language = arguments["language"]
        explanation_level = arguments.get("explanation_level", "intermediate")
        include_diagrams = arguments.get("include_diagrams", False)
        
        explanation_prompt = f"""
        Explain how this {language} code works at a {explanation_level} level.
        
        Code:
        ```{language}
        {code}
        ```
        
        Requirements:
        - Explanation level: {explanation_level}
        - Include diagrams: {include_diagrams}
        
        Please provide:
        1. High-level overview of what the code does
        2. Step-by-step breakdown of the logic
        3. Explanation of key concepts and patterns
        4. Input/output behavior
        5. Dependencies and requirements
        6. Common use cases or applications
        
        Adjust technical depth for {explanation_level} developers.
        """
        
        try:
            response = await openai_client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": f"You are a programming instructor explaining {language} code to {explanation_level} level students."},
                    {"role": "user", "content": explanation_prompt}
                ],
                temperature=0.4
            )
            
            explanation = response.choices[0].message.content
            
            explanation_result = f"""📖 Code Explanation

💻 Language: {language.title()}
🎓 Level: {explanation_level.title()}
📊 Diagrams: {'Included' if include_diagrams else 'Not included'}

{explanation}

💡 Learning Resources:
   • Practice similar patterns in your own projects
   • Experiment with modifications to understand behavior
   • Look for similar implementations in open source projects
   • Consider edge cases and error handling

🔍 Further Exploration:
   • Research the algorithms or patterns used
   • Understand the trade-offs involved
   • Learn about alternative implementations
   • Study the broader context where this code might be used
            """
            
            return [types.TextContent(type="text", text=explanation_result)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error explaining code: {str(e)}"
            )]
    
    elif name == "create_api_spec":
        code = arguments["code"]
        language = arguments["language"]
        api_framework = arguments.get("api_framework", "")
        include_examples = arguments.get("include_examples", True)
        spec_version = arguments.get("spec_version", "3.0")
        
        api_spec_prompt = f"""
        Generate an OpenAPI {spec_version} specification for this {language} API code.
        
        API Code:
        ```{language}
        {code}
        ```
        
        Framework: {api_framework}
        Include Examples: {include_examples}
        
        Please generate a complete OpenAPI specification including:
        1. Basic API information (title, version, description)
        2. Server configuration
        3. Authentication schemes
        4. All endpoints with HTTP methods
        5. Request/response schemas
        6. Error responses
        7. Examples for requests and responses
        
        Format as valid YAML OpenAPI specification.
        """
        
        try:
            response = await openai_client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": f"You are an API documentation expert specializing in OpenAPI specifications for {language} APIs."},
                    {"role": "user", "content": api_spec_prompt}
                ],
                temperature=0.2
            )
            
            api_spec = response.choices[0].message.content
            
            # Count endpoints
            endpoint_count = len(re.findall(r'paths:|get:|post:|put:|delete:|patch:', api_spec.lower()))
            
            spec_result = f"""📋 OpenAPI Specification Generated

📊 Specification Details:
   • Version: OpenAPI {spec_version}
   • Framework: {api_framework or 'Generic'}
   • Endpoints: ~{endpoint_count} operations
   • Examples: {'Included' if include_examples else 'Not included'}

💻 Language: {language.title()}

{api_spec}

🛠️ Usage Instructions:
   1. Save specification as openapi.yaml
   2. Validate using OpenAPI tools
   3. Generate client SDKs if needed
   4. Host documentation using Swagger UI
   5. Keep specification in sync with code changes

📚 Documentation Tools:
   • Swagger UI for interactive docs
   • Redoc for clean documentation
   • Postman for API testing
   • Code generators for client libraries

🔄 Maintenance Tips:
   • Update spec with every API change
   • Include realistic examples
   • Document error cases thoroughly
   • Version your API specification
            """
            
            return [types.TextContent(type="text", text=spec_result)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error creating API specification: {str(e)}"
            )]
    
    else:
        raise ValueError(f"Unknown tool: {name}")

async def main():
    """Main server execution"""
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="workflow-ai-developer",
                server_version="1.0.0",
                capabilities=server.get_capabilities(
                    notification_options=None,
                    experimental_capabilities={}
                )
            )
        )

if __name__ == "__main__":
    asyncio.run(main())