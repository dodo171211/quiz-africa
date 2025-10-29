@echo off
echo ========================================
echo   SERVIDOR MULTIPLAYER SIMPLES!
echo ========================================
echo.

echo [1/3] Parando processos Node.js...
taskkill /f /im node.exe >nul 2>&1

echo [2/3] Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo.
    echo Instale Node.js em: https://nodejs.org
    pause
    exit /b 1
)

echo [3/3] Iniciando servidor...
echo.
echo ✅ SERVIDOR MULTIPLAYER INICIADO!
echo.
echo 🌐 Acesse: http://localhost:3000
echo.
echo 📋 TESTE MULTIPLAYER:
echo 1. Abra http://localhost:3000
echo 2. Digite seu nome
echo 3. Clique "Entrar no Jogo"
echo 4. Veja a tela de espera
echo 5. Clique "Estou Pronto!"
echo 6. Abra OUTRA ABA do navegador
echo 7. Digite outro nome e entre
echo 8. Clique "Estou Pronto!" na segunda aba
echo 9. O jogo iniciará automaticamente!
echo.
echo Para parar: Ctrl+C
echo.

node server-simples-multiplayer.js
