Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEPLOY DO QUIZ PARA RAILWAY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
Write-Host "[1/5] Verificando se o Git está instalado..." -ForegroundColor Yellow
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

# Verificar se Railway CLI está instalado
Write-Host "[2/5] Verificando se o Railway CLI está instalado..." -ForegroundColor Yellow
try {
    $railwayVersion = railway --version
    Write-Host "✅ Railway CLI encontrado: $railwayVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Railway CLI não encontrado. Instalando..." -ForegroundColor Yellow
    try {
        npm install -g @railway/cli
        Write-Host "✅ Railway CLI instalado com sucesso!" -ForegroundColor Green
    } catch {
        Write-Host "❌ ERRO: Falha ao instalar Railway CLI!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Instale manualmente:" -ForegroundColor Yellow
        Write-Host "npm install -g @railway/cli" -ForegroundColor White
        Write-Host ""
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

# Inicializar repositório Git
Write-Host "[3/5] Inicializando repositório Git..." -ForegroundColor Yellow
git init
git add .
git commit -m "Deploy inicial do Quiz de Urbanização da África para Railway"

# Login no Railway
Write-Host "[4/5] Fazendo login no Railway..." -ForegroundColor Yellow
Write-Host "⚠️  Uma janela do navegador será aberta para login" -ForegroundColor Cyan
railway login

# Criar projeto e fazer deploy
Write-Host "[5/5] Criando projeto no Railway e fazendo deploy..." -ForegroundColor Yellow
railway init
railway up

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   DEPLOY CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Seu quiz está disponível em:" -ForegroundColor Cyan
railway domain
Write-Host ""
Write-Host "🌐 Abra este link no navegador para jogar!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Pressione Enter para sair"
