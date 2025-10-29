# 🚀 GUIA COMPLETO DE DEPLOY NO HEROKU

## ✅ Arquivos Configurados

Os seguintes arquivos foram criados/configurados para o deploy:

- ✅ `Procfile` - Configuração do Heroku
- ✅ `package.json` - Dependências e scripts
- ✅ `.gitignore` - Arquivos ignorados pelo Git
- ✅ `deploy-heroku.bat` - Script automático (Windows)
- ✅ `deploy-heroku.ps1` - Script automático (PowerShell)

## 🎯 Pré-requisitos

Antes de fazer o deploy, você precisa instalar:

### 1. Git
- **Download**: https://git-scm.com/download/win
- **Instalação**: Execute o instalador e siga as instruções
- **Verificar**: Abra o terminal e digite `git --version`

### 2. Heroku CLI
- **Download**: https://devcenter.heroku.com/articles/heroku-cli
- **Instalação**: Execute o instalador e siga as instruções
- **Verificar**: Abra o terminal e digite `heroku --version`

## 🚀 Deploy Automático

### Opção 1: Script Batch (Recomendado)
1. Clique duas vezes em: `deploy-heroku.bat`
2. Siga as instruções na tela
3. Aguarde o processo completo

### Opção 2: Script PowerShell
1. Clique com botão direito em: `deploy-heroku.ps1`
2. Selecione: "Executar com PowerShell"
3. Siga as instruções na tela

## 🔧 Deploy Manual

Se preferir fazer manualmente:

### 1. Inicializar Git
```bash
git init
git add .
git commit -m "Deploy inicial do Quiz de Urbanização da África"
```

### 2. Login no Heroku
```bash
heroku login
```

### 3. Criar App
```bash
heroku create meuquiz-africa
```

### 4. Deploy
```bash
git push heroku main
```

## 🌐 Acessar o Quiz Online

Após o deploy, seu quiz estará disponível em:
```
https://meuquiz-africa.herokuapp.com
```

## 🎮 Funcionalidades Online

✅ **Multiplayer em tempo real** - Jogadores de qualquer lugar
✅ **Ranking global** - Compete com jogadores do mundo todo
✅ **10 perguntas especializadas** - Sobre urbanização africana
✅ **Sistema de pontuação** - Baseado em velocidade
✅ **Interface responsiva** - Funciona em qualquer dispositivo
✅ **Sempre online** - Disponível 24/7

## 🔧 Configurações do Heroku

### Variáveis de Ambiente (Opcional)
```bash
heroku config:set NODE_ENV=production
```

### Logs do Servidor
```bash
heroku logs --tail
```

### Reiniciar App
```bash
heroku restart
```

## 📱 Testando o Multiplayer Online

1. **Abra várias abas** do navegador
2. **Acesse o link** do seu quiz
3. **Entre com nomes diferentes** em cada aba
4. **Quando houver 2+ jogadores**, o jogo começará!
5. **Responda as perguntas** sobre urbanização africana
6. **Veja o ranking** atualizado em tempo real!

## 🎯 Perguntas Incluídas

- Cidades mais populosas da África
- Taxas de urbanização por país
- Desafios da urbanização
- Crescimento populacional urbano
- Migração rural-urbana
- Desenvolvimento tecnológico
- E muito mais!

## 🆘 Solução de Problemas

### Erro de Git não encontrado
- Instale o Git: https://git-scm.com/download/win
- Reinicie o terminal

### Erro de Heroku CLI não encontrado
- Instale o Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
- Reinicie o terminal

### Erro de deploy
- Verifique se está logado: `heroku login`
- Verifique se o app existe: `heroku apps`

### App não carrega
- Verifique os logs: `heroku logs --tail`
- Reinicie o app: `heroku restart`

## 🎉 Resultado Final

Após o deploy bem-sucedido, você terá:

- 🌐 **Quiz online** acessível de qualquer lugar
- 🎮 **Multiplayer global** com jogadores do mundo todo
- 📊 **Ranking em tempo real** durante o jogo
- 🏆 **Sistema de pontuação** competitivo
- 📱 **Interface responsiva** para todos os dispositivos

---

**🎯 Seu quiz de urbanização africana estará online e pronto para jogar!**
