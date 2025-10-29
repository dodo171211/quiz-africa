@echo off
echo ========================================
echo   SERVIDOR BASICO - SEMPRE FUNCIONA!
echo ========================================
echo.

echo [1/3] Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo.
    echo Instale Node.js em: https://nodejs.org
    pause
    exit /b 1
)

echo [2/3] Navegando para pasta...
cd /d "%~dp0"
echo Pasta: %CD%

echo [3/3] Iniciando servidor basico...
echo.
echo ✅ SERVIDOR INICIADO!
echo.
echo 🌐 Acesse: http://localhost:3000
echo 🧪 Teste: http://localhost:3000/test
echo.
echo 📋 TESTE RAPIDO:
echo 1. Abra http://localhost:3000
echo 2. Digite seu nome
echo 3. Clique "Entrar no Jogo"
echo 4. Veja a tela de espera!
echo.
echo Se /test funcionar, o servidor esta OK!
echo Se o jogo nao funcionar, e problema com Socket.io
echo.
echo Para parar: Ctrl+C
echo.

node servidor-basico.js
