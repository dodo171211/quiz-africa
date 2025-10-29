@echo off
echo ========================================
echo   DEPLOY DO QUIZ PARA HEROKU
echo ========================================
echo.

echo [1/6] Verificando se o Git esta instalado...
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

echo [2/6] Verificando se o Heroku CLI esta instalado...
heroku --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Heroku CLI nao esta instalado!
    echo.
    echo Por favor, instale o Heroku CLI primeiro:
    echo 1. Acesse: https://devcenter.heroku.com/articles/heroku-cli
    echo 2. Baixe e instale o Heroku CLI
    echo 3. Reinicie o terminal e execute este script novamente
    echo.
    pause
    exit /b 1
)

echo [3/6] Inicializando repositorio Git...
git init
git add .
git commit -m "Deploy inicial do Quiz de Urbanizacao da Africa"

echo [4/6] Fazendo login no Heroku...
heroku login

echo [5/6] Criando app no Heroku...
set /p APP_NAME="Digite o nome do seu app (ex: meuquiz-africa): "
heroku create %APP_NAME%

echo [6/6] Fazendo deploy para o Heroku...
git push heroku main

echo.
echo ========================================
echo   DEPLOY CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Seu quiz esta disponivel em:
echo https://%APP_NAME%.herokuapp.com
echo.
echo Abra este link no navegador para jogar!
echo.
pause
