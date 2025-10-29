Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEPLOY DO QUIZ PARA HEROKU" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
Write-Host "[1/6] Verificando se o Git está instalado..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERRO: Git não está instalado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instale o Git primeiro:" -ForegroundColor Yellow
    Write-Host "1. Acesse: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "2. Baixe e instale o Git para Windows" -ForegroundColor White
    Write-Host "3. Reinicie o terminal e execute este script novamente" -ForegroundColor White
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se Heroku CLI está instalado
Write-Host "[2/6] Verificando se o Heroku CLI está instalado..." -ForegroundColor Yellow
try {
    $herokuVersion = heroku --version
    Write-Host "✅ Heroku CLI encontrado: $herokuVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERRO: Heroku CLI não está instalado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instale o Heroku CLI primeiro:" -ForegroundColor Yellow
    Write-Host "1. Acesse: https://devcenter.heroku.com/articles/heroku-cli" -ForegroundColor White
    Write-Host "2. Baixe e instale o Heroku CLI" -ForegroundColor White
    Write-Host "3. Reinicie o terminal e execute este script novamente" -ForegroundColor White
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Inicializar repositório Git
Write-Host "[3/6] Inicializando repositório Git..." -ForegroundColor Yellow
git init
git add .
git commit -m "Deploy inicial do Quiz de Urbanização da África"

# Login no Heroku
Write-Host "[4/6] Fazendo login no Heroku..." -ForegroundColor Yellow
Write-Host "⚠️  Uma janela do navegador será aberta para login" -ForegroundColor Cyan
heroku login

# Criar app no Heroku
Write-Host "[5/6] Criando app no Heroku..." -ForegroundColor Yellow
$appName = Read-Host "Digite o nome do seu app (ex: meuquiz-africa)"
heroku create $appName

# Deploy para Heroku
Write-Host "[6/6] Fazendo deploy para o Heroku..." -ForegroundColor Yellow
git push heroku main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   DEPLOY CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Seu quiz está disponível em:" -ForegroundColor Cyan
Write-Host "https://$appName.herokuapp.com" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Abra este link no navegador para jogar!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"
