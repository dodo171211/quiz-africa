@echo off
echo ========================================
echo   SERVIDOR SIMPLIFICADO - FUNCIONA!
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

echo [3/3] Iniciando servidor simplificado...
echo.
echo ✅ Servidor iniciado! Teste agora:
echo.
echo 1. http://localhost:3000 - Jogo principal
echo 2. http://localhost:3000/debug - Pagina de debug
echo 3. http://localhost:3000/test - Teste de API
echo.
echo 📋 INSTRUCOES:
echo 1. Abra http://localhost:3000
echo 2. Digite seu nome
echo 3. Clique "Entrar no Jogo"
echo 4. Deve funcionar agora!
echo.
echo Se ainda nao funcionar:
echo - Use http://localhost:3000/debug
echo - Veja os logs no console
echo - Verifique se ha erros
echo.
echo Para parar: Ctrl+C
echo.

node servidor-simples.js
