# 🚀 GUIA COMPLETO DE DEPLOY NO RAILWAY

## ✅ Arquivos Configurados

Os seguintes arquivos foram criados/configurados para o deploy no Railway:

- ✅ `package.json` - Otimizado para Railway com Node.js 18+
- ✅ `railway.json` - Configuração específica do Railway
- ✅ `server.js` - Servidor na raiz do projeto
- ✅ `public/` - Pasta com arquivos do front-end
- ✅ `deploy-railway.bat` - Script automático (Windows)
- ✅ `deploy-railway.ps1` - Script automático (PowerShell)

## 🎯 Vantagens do Railway

- ✅ **Sem cartão de crédito** necessário
- ✅ **Deploy automático** via GitHub
- ✅ **Domínio personalizado** gratuito
- ✅ **SSL automático** (HTTPS)
- ✅ **Escalabilidade** automática
- ✅ **Logs em tempo real**
- ✅ **Interface web** intuitiva

## 🚀 Deploy Automático

### Opção 1: Script Batch (Recomendado)
1. Clique duas vezes em: `deploy-railway.bat`
2. Siga as instruções na tela
3. Aguarde o processo completo

### Opção 2: Script PowerShell
1. Clique com botão direito em: `deploy-railway.ps1`
2. Selecione: "Executar com PowerShell"
3. Siga as instruções na tela

## 🔧 Deploy Manual

Se preferir fazer manualmente:

### 1. Instalar Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login no Railway
```bash
railway login
```

### 3. Inicializar Git
```bash
git init
git add .
git commit -m "Deploy inicial do Quiz de Urbanização da África"
```

### 4. Criar Projeto e Deploy
```bash
railway init
railway up
```

### 5. Obter Domínio
```bash
railway domain
```

## 🌐 Deploy via GitHub (Recomendado)

### 1. Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `quiz-urbanizacao-africa`
3. Marque como público
4. Crie o repositório

### 2. Fazer Upload dos Arquivos
1. Faça upload de todos os arquivos do projeto
2. Faça commit inicial

### 3. Conectar ao Railway
1. Acesse: https://railway.app
2. Clique em "New Project"
3. Selecione "Deploy from GitHub repo"
4. Escolha seu repositório
5. Railway fará deploy automático!

## 🌐 Acessar o Quiz Online

Após o deploy, seu quiz estará disponível em:
```
https://[nome-do-projeto].railway.app
```

## 🎮 Funcionalidades Online

✅ **Multiplayer em tempo real** - Jogadores de qualquer lugar
✅ **Ranking global** - Compete com jogadores do mundo todo
✅ **10 perguntas especializadas** - Sobre urbanização africana
✅ **Sistema de pontuação** - Baseado em velocidade
✅ **Interface responsiva** - Funciona em qualquer dispositivo
✅ **Sempre online** - Disponível 24/7
✅ **HTTPS seguro** - Conexão criptografada

## 🔧 Configurações do Railway

### Variáveis de Ambiente (Opcional)
```bash
railway variables set NODE_ENV=production
railway variables set PORT=3000
```

### Logs do Servidor
```bash
railway logs
```

### Status do Deploy
```bash
railway status
```

### Reiniciar App
```bash
railway restart
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

### Erro de Railway CLI não encontrado
- Instale: `npm install -g @railway/cli`
- Reinicie o terminal

### Erro de deploy
- Verifique se está logado: `railway login`
- Verifique os logs: `railway logs`

### App não carrega
- Verifique os logs: `railway logs`
- Reinicie o app: `railway restart`

### Domínio não funciona
- Verifique o domínio: `railway domain`
- Aguarde alguns minutos para propagação

## 🎉 Resultado Final

Após o deploy bem-sucedido, você terá:

- 🌐 **Quiz online** acessível de qualquer lugar
- 🎮 **Multiplayer global** com jogadores do mundo todo
- 📊 **Ranking em tempo real** durante o jogo
- 🏆 **Sistema de pontuação** competitivo
- 📱 **Interface responsiva** para todos os dispositivos
- 🔒 **HTTPS seguro** para conexões seguras
- 🚀 **Deploy automático** via GitHub

## 🔗 Links Úteis

- [Railway](https://railway.app) - Plataforma de deploy
- [Railway CLI](https://docs.railway.app/develop/cli) - Documentação CLI
- [GitHub](https://github.com) - Repositório de código

---

**🎯 Seu quiz de urbanização africana estará online e pronto para jogar!**
