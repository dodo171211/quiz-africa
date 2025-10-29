@echo off
echo ========================================
echo   INICIANDO SERVIDOR COM DEBUG
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

echo [3/3] Iniciando servidor...
echo.
echo Servidor iniciado! Teste os links:
echo.
echo 1. http://localhost:3000 - Jogo normal
echo 2. http://localhost:3000/debug.html - Pagina de DEBUG
echo.
echo IMPORTANTE: Use a pagina de DEBUG para identificar problemas!
echo.
echo A pagina de debug vai mostrar:
echo - Se Socket.io carregou
echo - Se conseguiu conectar
echo - Erros detalhados
echo - Logs em tempo real
echo.
echo Para parar: Ctrl+C
echo.

node server.js
