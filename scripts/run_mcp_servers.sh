#!/bin/bash
# WorkflowAI MCP Server Launcher Script

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
MCP_SERVERS_DIR="./mcp-servers"
LOG_DIR="./logs"
PYTHON_VENV="./venv"

# Create necessary directories
mkdir -p $LOG_DIR

echo -e "${BLUE}🚀 WorkflowAI MCP Server Launcher${NC}"
echo -e "${BLUE}======================================${NC}"

# Check Python virtual environment
if [ ! -d "$PYTHON_VENV" ]; then
    echo -e "${YELLOW}📦 Creating Python virtual environment...${NC}"
    python3 -m venv $PYTHON_VENV
fi

# Activate virtual environment
source $PYTHON_VENV/bin/activate

# Install requirements
echo -e "${YELLOW}📋 Installing MCP server dependencies...${NC}"
pip install -q anthropic openai fastapi uvicorn python-dotenv supabase pillow requests httpx

# Function to start MCP server
start_mcp_server() {
    local server_name=$1
    local server_file="$MCP_SERVERS_DIR/${server_name}_server.py"
    local log_file="$LOG_DIR/${server_name}_server.log"
    local pid_file="$LOG_DIR/${server_name}_server.pid"
    
    if [ -f "$server_file" ]; then
        echo -e "${GREEN}🔄 Starting ${server_name} MCP server...${NC}"
        
        # Kill existing process if running
        if [ -f "$pid_file" ]; then
            local old_pid=$(cat $pid_file)
            if kill -0 $old_pid 2>/dev/null; then
                echo -e "${YELLOW}⚠️  Stopping existing ${server_name} server (PID: $old_pid)${NC}"
                kill $old_pid
            fi
        fi
        
        # Start new server
        nohup python3 "$server_file" > "$log_file" 2>&1 &
        local new_pid=$!
        echo $new_pid > "$pid_file"
        
        # Wait a moment and check if process is running
        sleep 2
        if kill -0 $new_pid 2>/dev/null; then
            echo -e "${GREEN}✅ ${server_name} server started (PID: $new_pid)${NC}"
        else
            echo -e "${RED}❌ Failed to start ${server_name} server${NC}"
            cat "$log_file"
        fi
    else
        echo -e "${RED}❌ Server file not found: $server_file${NC}"
    fi
}

# Function to stop MCP server
stop_mcp_server() {
    local server_name=$1
    local pid_file="$LOG_DIR/${server_name}_server.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat $pid_file)
        if kill -0 $pid 2>/dev/null; then
            echo -e "${YELLOW}🛑 Stopping ${server_name} server (PID: $pid)...${NC}"
            kill $pid
            rm -f "$pid_file"
            echo -e "${GREEN}✅ ${server_name} server stopped${NC}"
        else
            echo -e "${YELLOW}⚠️  ${server_name} server not running${NC}"
            rm -f "$pid_file"
        fi
    else
        echo -e "${YELLOW}⚠️  No PID file found for ${server_name} server${NC}"
    fi
}

# Function to check server status
check_server_status() {
    local server_name=$1
    local pid_file="$LOG_DIR/${server_name}_server.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat $pid_file)
        if kill -0 $pid 2>/dev/null; then
            echo -e "${GREEN}✅ ${server_name} server is running (PID: $pid)${NC}"
            
            # Check if server is responding (if it has HTTP endpoint)
            local port=""
            case $server_name in
                "marketing") port="8001" ;;
                "design") port="8002" ;;
                "developer") port="8003" ;;
            esac
            
            if [ ! -z "$port" ]; then
                if curl -s -f "http://localhost:$port/health" > /dev/null 2>&1; then
                    echo -e "${GREEN}  └─ HTTP endpoint responding on port $port${NC}"
                else
                    echo -e "${YELLOW}  └─ HTTP endpoint not responding on port $port${NC}"
                fi
            fi
        else
            echo -e "${RED}❌ ${server_name} server not running${NC}"
            rm -f "$pid_file"
        fi
    else
        echo -e "${RED}❌ ${server_name} server not running (no PID file)${NC}"
    fi
}

# Function to show logs
show_logs() {
    local server_name=$1
    local log_file="$LOG_DIR/${server_name}_server.log"
    
    if [ -f "$log_file" ]; then
        echo -e "${BLUE}📋 Last 20 lines of ${server_name} server logs:${NC}"
        tail -n 20 "$log_file"
    else
        echo -e "${RED}❌ No log file found for ${server_name} server${NC}"
    fi
}

# Main script logic
case "${1:-start}" in
    "start")
        echo -e "${GREEN}🚀 Starting all MCP servers...${NC}"
        start_mcp_server "marketing"
        start_mcp_server "design" 
        start_mcp_server "developer"
        echo -e "${GREEN}✅ All MCP servers started${NC}"
        ;;
        
    "stop")
        echo -e "${YELLOW}🛑 Stopping all MCP servers...${NC}"
        stop_mcp_server "marketing"
        stop_mcp_server "design"
        stop_mcp_server "developer"
        echo -e "${GREEN}✅ All MCP servers stopped${NC}"
        ;;
        
    "restart")
        echo -e "${BLUE}🔄 Restarting all MCP servers...${NC}"
        $0 stop
        sleep 3
        $0 start
        ;;
        
    "status")
        echo -e "${BLUE}📊 MCP Server Status:${NC}"
        echo -e "${BLUE}=====================${NC}"
        check_server_status "marketing"
        check_server_status "design"
        check_server_status "developer"
        ;;
        
    "logs")
        if [ ! -z "$2" ]; then
            show_logs "$2"
        else
            echo -e "${BLUE}📋 Available log files:${NC}"
            ls -la $LOG_DIR/*.log 2>/dev/null | awk '{print $9}' | xargs -I {} basename {} .log
            echo -e "${YELLOW}Usage: $0 logs [marketing|design|developer]${NC}"
        fi
        ;;
        
    "install")
        echo -e "${YELLOW}📦 Installing/updating dependencies...${NC}"
        pip install --upgrade anthropic openai fastapi uvicorn python-dotenv supabase pillow requests httpx pydantic
        echo -e "${GREEN}✅ Dependencies installed${NC}"
        ;;
        
    "health")
        echo -e "${BLUE}🏥 Health check for all servers:${NC}"
        
        # Check Marketing Server
        if curl -s -f "http://localhost:8001/health" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Marketing Server: Healthy${NC}"
        else
            echo -e "${RED}❌ Marketing Server: Unhealthy${NC}"
        fi
        
        # Check Design Server  
        if curl -s -f "http://localhost:8002/health" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Design Server: Healthy${NC}"
        else
            echo -e "${RED}❌ Design Server: Unhealthy${NC}"
        fi
        
        # Check Developer Server
        if curl -s -f "http://localhost:8003/health" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Developer Server: Healthy${NC}"
        else
            echo -e "${RED}❌ Developer Server: Unhealthy${NC}"
        fi
        ;;
        
    "test")
        echo -e "${BLUE}🧪 Testing MCP servers with sample requests...${NC}"
        
        # Test Marketing Server
        echo -e "${YELLOW}Testing Marketing Server...${NC}"
        curl -X POST "http://localhost:8001/generate-content" \
             -H "Content-Type: application/json" \
             -d '{"type": "blog_post", "topic": "AI productivity", "length": "short"}' \
             -s | jq '.' 2>/dev/null || echo "Marketing server test failed"
        
        # Test Design Server
        echo -e "${YELLOW}Testing Design Server...${NC}"
        curl -X POST "http://localhost:8002/generate-image" \
             -H "Content-Type: application/json" \
             -d '{"prompt": "modern logo design", "style": "minimalist"}' \
             -s | jq '.' 2>/dev/null || echo "Design server test failed"
        
        # Test Developer Server
        echo -e "${YELLOW}Testing Developer Server...${NC}"
        curl -X POST "http://localhost:8003/review-code" \
             -H "Content-Type: application/json" \
             -d '{"code": "def hello(): print(\"hello world\")", "language": "python"}' \
             -s | jq '.' 2>/dev/null || echo "Developer server test failed"
        ;;
        
    "help"|"-h"|"--help")
        echo -e "${BLUE}WorkflowAI MCP Server Launcher${NC}"
        echo -e "${BLUE}==============================${NC}"
        echo ""
        echo -e "${YELLOW}Usage:${NC} $0 [command]"
        echo ""
        echo -e "${YELLOW}Commands:${NC}"
        echo "  start     - Start all MCP servers (default)"
        echo "  stop      - Stop all MCP servers"
        echo "  restart   - Restart all MCP servers"
        echo "  status    - Check status of all servers"
        echo "  logs      - Show logs (specify server: marketing|design|developer)"
        echo "  install   - Install/update dependencies"
        echo "  health    - Health check all servers"
        echo "  test      - Test servers with sample requests"
        echo "  help      - Show this help message"
        echo ""
        echo -e "${YELLOW}Examples:${NC}"
        echo "  $0 start"
        echo "  $0 logs marketing"
        echo "  $0 status"
        echo ""
        ;;
        
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        echo -e "${YELLOW}Use '$0 help' for available commands${NC}"
        exit 1
        ;;
esac

# Check if MCP configuration file exists
MCP_CONFIG_FILE="./mcp_config.json"
if [ ! -f "$MCP_CONFIG_FILE" ]; then
    echo -e "${YELLOW}⚠️  MCP configuration file not found. Creating default...${NC}"
    cat > "$MCP_CONFIG_FILE" << EOF
{
  "servers": {
    "marketing": {
      "command": "python3",
      "args": ["./mcp-servers/marketing_server.py"],
      "port": 8001,
      "description": "AI Marketing Content Generation Server"
    },
    "design": {
      "command": "python3", 
      "args": ["./mcp-servers/design_server.py"],
      "port": 8002,
      "description": "AI Design and Image Generation Server"
    },
    "developer": {
      "command": "python3",
      "args": ["./mcp-servers/developer_server.py"], 
      "port": 8003,
      "description": "AI Development and Code Review Server"
    }
  },
  "global_settings": {
    "timeout": 30,
    "retry_count": 3,
    "log_level": "INFO"
  }
}
EOF
    echo -e "${GREEN}✅ Default MCP configuration created${NC}"
fi

echo -e "${BLUE}🎯 WorkflowAI MCP servers are ready!${NC}"
echo -e "${BLUE}   • Marketing Server: http://localhost:8001${NC}"
echo -e "${BLUE}   • Design Server: http://localhost:8002${NC}" 
echo -e "${BLUE}   • Developer Server: http://localhost:8003${NC}"
echo ""