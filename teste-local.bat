@echo off
echo ========================================
echo   TESTE LOCAL DO QUIZ
echo ========================================
echo.

echo [1/3] Verificando se Node.js esta instalado...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao esta instalado!
    echo.
    echo Por favor, instale o Node.js primeiro:
    echo 1. Acesse: https://nodejs.org
    echo 2. Baixe e instale a versao LTS
    echo 3. Reinicie o terminal e execute este script novamente
    echo.
    pause
    exit /b 1
)

echo [2/3] Instalando dependencias...
npm install

echo [3/3] Iniciando servidor local...
echo.
echo Servidor iniciado! Acesse: http://localhost:3000
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.

node server.js
