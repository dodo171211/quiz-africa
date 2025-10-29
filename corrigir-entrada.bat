@echo off
echo ========================================
echo   CORRIGINDO PROBLEMA DE ENTRADA
echo ========================================
echo.

echo [1/4] Verificando se Node.js esta instalado...
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

echo [2/4] Navegando para a pasta correta...
cd /d "%~dp0"
echo Pasta atual: %CD%

echo [3/4] Verificando arquivos...
if not exist "server.js" (
    echo ERRO: Arquivo server.js nao encontrado!
    echo.
    echo Certifique-se de que esta na pasta correta do projeto.
    echo.
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ERRO: Arquivo package.json nao encontrado!
    echo.
    echo Certifique-se de que esta na pasta correta do projeto.
    echo.
    pause
    exit /b 1
)

echo [4/4] Instalando dependencias e iniciando servidor...
echo.
npm install
echo.
echo Servidor iniciado! Acesse: http://localhost:3000
echo.
echo Se ainda nao conseguir entrar:
echo 1. Verifique se o navegador esta bloqueando JavaScript
echo 2. Tente usar outro navegador
echo 3. Verifique se o firewall nao esta bloqueando
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.

node server.js
