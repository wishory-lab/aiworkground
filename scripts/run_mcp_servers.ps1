# WorkflowAI MCP Server Launcher Script (PowerShell)
# Windows용 MCP 서버 실행 스크립트

# 색상 출력 함수
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# 설정
$MCP_SERVERS_DIR = ".\mcp-servers"
$LOG_DIR = ".\logs"
$PYTHON_VENV = ".\venv"

# 로그 디렉토리 생성
if (-not (Test-Path $LOG_DIR)) {
    New-Item -ItemType Directory -Path $LOG_DIR | Out-Null
}

Write-ColorOutput Cyan "🚀 WorkflowAI MCP Server Launcher"
Write-ColorOutput Cyan "======================================"

# Python 가상환경 확인
if (-not (Test-Path $PYTHON_VENV)) {
    Write-ColorOutput Yellow "📦 Creating Python virtual environment..."
    python -m venv $PYTHON_VENV
}

# 가상환경 활성화
$activateScript = Join-Path $PYTHON_VENV "Scripts\Activate.ps1"
if (Test-Path $activateScript) {
    & $activateScript
} else {
    Write-ColorOutput Red "❌ Virtual environment activation script not found"
    exit 1
}

# 의존성 설치
Write-ColorOutput Yellow "📋 Installing MCP server dependencies..."
pip install -q anthropic openai fastapi uvicorn python-dotenv supabase pillow requests httpx pydantic mcp

# MCP 서버 시작 함수
function Start-MCPServer {
    param(
        [string]$ServerName,
        [string]$ServerFile,
        [string]$LogFile,
        [string]$PidFile
    )
    
    if (Test-Path $ServerFile) {
        Write-ColorOutput Green "🔄 Starting ${ServerName} MCP server..."
        
        # 기존 프로세스 종료
        if (Test-Path $PidFile) {
            $oldPid = Get-Content $PidFile
            $process = Get-Process -Id $oldPid -ErrorAction SilentlyContinue
            if ($process) {
                Write-ColorOutput Yellow "⚠️  Stopping existing ${ServerName} server (PID: $oldPid)"
                Stop-Process -Id $oldPid -Force
            }
        }
        
        # 새 서버 시작
        $job = Start-Job -ScriptBlock {
            param($ServerFile, $LogFile)
            Set-Location $using:PWD
            & "$using:PYTHON_VENV\Scripts\python.exe" $ServerFile *> $LogFile
        } -ArgumentList $ServerFile, $LogFile
        
        $job.Id | Out-File -FilePath $PidFile -NoNewline
        
        Start-Sleep -Seconds 2
        
        if ($job.State -eq "Running") {
            Write-ColorOutput Green "✅ ${ServerName} server started (Job ID: $($job.Id))"
        } else {
            Write-ColorOutput Red "❌ Failed to start ${ServerName} server"
            Get-Content $LogFile -Tail 10
        }
    } else {
        Write-ColorOutput Red "❌ Server file not found: $ServerFile"
    }
}

# MCP 서버 중지 함수
function Stop-MCPServer {
    param(
        [string]$ServerName,
        [string]$PidFile
    )
    
    if (Test-Path $PidFile) {
        $jobId = Get-Content $PidFile
        $job = Get-Job -Id $jobId -ErrorAction SilentlyContinue
        
        if ($job) {
            Write-ColorOutput Yellow "🛑 Stopping ${ServerName} server (Job ID: $jobId)..."
            Stop-Job -Id $jobId
            Remove-Job -Id $jobId
            Remove-Item $PidFile
            Write-ColorOutput Green "✅ ${ServerName} server stopped"
        } else {
            Write-ColorOutput Yellow "⚠️  ${ServerName} server not running"
            Remove-Item $PidFile
        }
    } else {
        Write-ColorOutput Yellow "⚠️  No PID file found for ${ServerName} server"
    }
}

# 서버 상태 확인 함수
function Check-ServerStatus {
    param([string]$ServerName)
    
    $pidFile = Join-Path $LOG_DIR "${ServerName}_server.pid"
    
    if (Test-Path $pidFile) {
        $jobId = Get-Content $pidFile
        $job = Get-Job -Id $jobId -ErrorAction SilentlyContinue
        
        if ($job -and $job.State -eq "Running") {
            Write-ColorOutput Green "✅ ${ServerName} server is running (Job ID: $jobId)"
        } else {
            Write-ColorOutput Red "❌ ${ServerName} server not running"
            Remove-Item $pidFile -ErrorAction SilentlyContinue
        }
    } else {
        Write-ColorOutput Red "❌ ${ServerName} server not running (no PID file)"
    }
}

# 로그 보기 함수
function Show-Logs {
    param([string]$ServerName)
    
    $logFile = Join-Path $LOG_DIR "${ServerName}_server.log"
    
    if (Test-Path $logFile) {
        Write-ColorOutput Cyan "📋 Last 20 lines of ${ServerName} server logs:"
        Get-Content $logFile -Tail 20
    } else {
        Write-ColorOutput Red "❌ No log file found for ${ServerName} server"
    }
}

# 메인 로직
$command = if ($args.Count -gt 0) { $args[0] } else { "start" }

switch ($command) {
    "start" {
        Write-ColorOutput Green "🚀 Starting all MCP servers..."
        Start-MCPServer "marketing" "$MCP_SERVERS_DIR\marketing_server.py" "$LOG_DIR\marketing_server.log" "$LOG_DIR\marketing_server.pid"
        Start-MCPServer "design" "$MCP_SERVERS_DIR\design_server.py" "$LOG_DIR\design_server.log" "$LOG_DIR\design_server.pid"
        Start-MCPServer "developer" "$MCP_SERVERS_DIR\developer_server.py" "$LOG_DIR\developer_server.log" "$LOG_DIR\developer_server.pid"
        Write-ColorOutput Green "✅ All MCP servers started"
    }
    
    "stop" {
        Write-ColorOutput Yellow "🛑 Stopping all MCP servers..."
        Stop-MCPServer "marketing" "$LOG_DIR\marketing_server.pid"
        Stop-MCPServer "design" "$LOG_DIR\design_server.pid"
        Stop-MCPServer "developer" "$LOG_DIR\developer_server.pid"
        Write-ColorOutput Green "✅ All MCP servers stopped"
    }
    
    "restart" {
        Write-ColorOutput Cyan "🔄 Restarting all MCP servers..."
        & $PSCommandPath "stop"
        Start-Sleep -Seconds 3
        & $PSCommandPath "start"
    }
    
    "status" {
        Write-ColorOutput Cyan "📊 MCP Server Status:"
        Write-ColorOutput Cyan "====================="
        Check-ServerStatus "marketing"
        Check-ServerStatus "design"
        Check-ServerStatus "developer"
    }
    
    "logs" {
        if ($args.Count -gt 1) {
            Show-Logs $args[1]
        } else {
            Write-ColorOutput Cyan "📋 Available log files:"
            Get-ChildItem $LOG_DIR -Filter "*.log" | ForEach-Object { $_.BaseName }
            Write-ColorOutput Yellow "Usage: .\run_mcp_servers.ps1 logs [marketing|design|developer]"
        }
    }
    
    "install" {
        Write-ColorOutput Yellow "📦 Installing/updating dependencies..."
        pip install --upgrade anthropic openai fastapi uvicorn python-dotenv supabase pillow requests httpx pydantic mcp
        Write-ColorOutput Green "✅ Dependencies installed"
    }
    
    "help" {
        Write-ColorOutput Cyan "WorkflowAI MCP Server Launcher"
        Write-ColorOutput Cyan "=============================="
        Write-Output ""
        Write-ColorOutput Yellow "Usage: .\run_mcp_servers.ps1 [command]"
        Write-Output ""
        Write-ColorOutput Yellow "Commands:"
        Write-Output "  start     - Start all MCP servers (default)"
        Write-Output "  stop      - Stop all MCP servers"
        Write-Output "  restart   - Restart all MCP servers"
        Write-Output "  status    - Check status of all servers"
        Write-Output "  logs      - Show logs (specify server: marketing|design|developer)"
        Write-Output "  install   - Install/update dependencies"
        Write-Output "  help      - Show this help message"
        Write-Output ""
        Write-ColorOutput Yellow "Examples:"
        Write-Output "  .\run_mcp_servers.ps1 start"
        Write-Output "  .\run_mcp_servers.ps1 logs marketing"
        Write-Output "  .\run_mcp_servers.ps1 status"
    }
    
    default {
        Write-ColorOutput Red "❌ Unknown command: $command"
        Write-ColorOutput Yellow "Use '.\run_mcp_servers.ps1 help' for available commands"
        exit 1
    }
}

Write-ColorOutput Cyan "🎯 WorkflowAI MCP servers are ready!"
Write-ColorOutput Cyan "   • Marketing Server: http://localhost:8001"
Write-ColorOutput Cyan "   • Design Server: http://localhost:8002"
Write-ColorOutput Cyan "   • Developer Server: http://localhost:8003"
Write-Output ""

