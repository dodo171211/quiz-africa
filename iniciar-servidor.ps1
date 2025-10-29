Write-Host "Iniciando servidor do Quiz de Urbanizacao da Africa..." -ForegroundColor Green
Write-Host ""

# Navegar para a pasta do projeto
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath

Write-Host "Pasta atual: $(Get-Location)" -ForegroundColor Yellow
Write-Host "Arquivos na pasta:" -ForegroundColor Yellow
Get-ChildItem -Name

Write-Host ""
Write-Host "Executando servidor..." -ForegroundColor Green
Write-Host "Acesse: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

# Executar o servidor
node server.js
