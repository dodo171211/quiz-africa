@echo off
echo ========================================
echo   TESTE LOCAL DO QUIZ COM 18 JOGADORES
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
echo NOVAS FUNCIONALIDADES:
echo - Suporte para ate 18 jogadores
echo - Botao "Estou Pronto" para cada jogador
echo - Inicio automatico quando atingir 18 jogadores
echo - Inicio quando todos clicarem em "Pronto"
echo.
echo Para testar o multiplayer:
echo 1. Abra varias abas do navegador
echo 2. Entre com nomes diferentes em cada aba
echo 3. Clique em "Estou Pronto" em cada aba
echo 4. O jogo iniciara quando todos estiverem prontos!
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.

node server.js
