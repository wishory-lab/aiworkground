# Backend 서버 테스트 스크립트
Write-Host "Backend Server Test" -ForegroundColor Cyan

# 환경 변수 로드
$env:ENVIRONMENT = "development"

# Backend 디렉토리로 이동
Set-Location "$PSScriptRoot\..\backend"

# 가상환경 활성화 및 서버 실행
& "..\venv\Scripts\python.exe" -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

