@echo off
echo ========================================
echo   TESTE SIMPLES DO SERVIDOR
echo ========================================
echo.

echo [1/3] Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    pause
    exit /b 1
)

echo [2/3] Navegando para pasta correta...
cd /d "%~dp0"
echo Pasta: %CD%

echo [3/3] Iniciando servidor de teste...
echo.
echo Servidor iniciado! Teste os links:
echo.
echo 1. http://localhost:3000 - Pagina principal
echo 2. http://localhost:3000/test - Teste de API
echo.
echo Se conseguir acessar /test, o servidor funciona!
echo Se nao conseguir entrar no jogo, e problema com Socket.io
echo.
echo Para parar: Ctrl+C
echo.

node servidor-teste.js
