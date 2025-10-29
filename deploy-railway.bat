@echo off
echo ========================================
echo   DEPLOY DO QUIZ PARA RAILWAY
echo ========================================
echo.

echo [1/5] Verificando se o Git esta instalado...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Git nao esta instalado!
    echo.
    echo Por favor, instale o Git primeiro:
    echo 1. Acesse: https://git-scm.com/download/win
    echo 2. Baixe e instale o Git para Windows
    echo 3. Reinicie o terminal e execute este script novamente
    echo.
    pause
    exit /b 1
)

echo [2/5] Verificando se o Railway CLI esta instalado...
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Railway CLI nao encontrado. Instalando...
    npm install -g @railway/cli
    if %errorlevel% neq 0 (
        echo ERRO: Falha ao instalar Railway CLI!
        echo.
        echo Instale manualmente:
        echo npm install -g @railway/cli
        echo.
        pause
        exit /b 1
    )
)

echo [3/5] Inicializando repositorio Git...
git init
git add .
git commit -m "Deploy inicial do Quiz de Urbanizacao da Africa para Railway"

echo [4/5] Fazendo login no Railway...
railway login

echo [5/5] Criando projeto no Railway e fazendo deploy...
railway init
railway up

echo.
echo ========================================
echo   DEPLOY CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Seu quiz esta disponivel em:
railway domain
echo.
echo Abra este link no navegador para jogar!
echo.
pause
