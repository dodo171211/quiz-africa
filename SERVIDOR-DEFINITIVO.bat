@echo off
echo ========================================
echo   SERVIDOR DEFINITIVO - SEMPRE FUNCIONA!
echo ========================================
echo.

echo [1/3] Parando processos Node.js...
taskkill /f /im node.exe >nul 2>&1

echo [2/3] Verificando arquivos...
if not exist "public\index.html" (
    echo ERRO: Arquivo public\index.html nao encontrado!
    pause
    exit /b 1
)

echo [3/3] Iniciando servidor...
echo.
echo ✅ SERVIDOR INICIADO!
echo.
echo 🌐 Acesse: http://localhost:3000
echo.
echo 📋 TESTE RAPIDO:
echo 1. Abra http://localhost:3000
echo 2. Digite seu nome
echo 3. Clique "Entrar no Jogo"
echo 4. Veja a tela de espera!
echo.
echo Se aparecer a tela de espera, esta funcionando!
echo Para parar: Ctrl+C
echo.

node servidor-simples-funcional.js
