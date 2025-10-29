@echo off
echo ========================================
echo   SERVIDOR MULTIPLAYER REAL!
echo ========================================
echo.

echo [1/4] Parando processos Node.js...
taskkill /f /im node.exe >nul 2>&1

echo [2/4] Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo.
    echo Instale Node.js em: https://nodejs.org
    pause
    exit /b 1
)

echo [3/4] Navegando para pasta...
cd /d "%~dp0"
echo Pasta: %CD%

echo [4/4] Instalando dependencias...
npm install express socket.io

echo.
echo ✅ INICIANDO SERVIDOR MULTIPLAYER!
echo.
echo 🌐 Acesse: http://localhost:3000
echo.
echo 📋 TESTE MULTIPLAYER:
echo 1. Abra http://localhost:3000
echo 2. Digite seu nome
echo 3. Clique "Entrar no Jogo"
echo 4. Veja a tela de espera
echo 5. Clique "Estou Pronto!"
echo 6. AGUARDE outros jogadores ou inicie com 2+
echo 7. Responda as perguntas em tempo real!
echo.
echo Para testar multiplayer:
echo - Abra varias abas do navegador
echo - Ou peça para amigos acessarem o mesmo link
echo.

node server-multiplayer.js
