# 🚀 GUIA SIMPLES - SEM POWERSHELL

## ✅ COMO EXECUTAR LOCALMENTE:

### 1. Abra o Prompt de Comando (cmd)
- Pressione `Windows + R`
- Digite `cmd` e pressione Enter

### 2. Navegue para a pasta do projeto:
```
cd "C:\Users\Douglas\OneDrive\Área de Trabalho\jogo geografia"
```

### 3. Execute o servidor:
```
node server-railway.js
```

### 4. Acesse no navegador:
```
http://localhost:3000
```

## 🎮 TESTAR MULTIPLAYER:

1. **Abra o navegador** em `http://localhost:3000`
2. **Digite seu nome** (ex: "Jogador 1")
3. **Clique "Entrar no Jogo"**
4. **Abra OUTRA ABA** do navegador
5. **Acesse novamente** `http://localhost:3000`
6. **Digite outro nome** (ex: "Jogador 2")
7. **Clique "Entrar no Jogo"** na segunda aba
8. **Clique "Estou Pronto!"** nas duas abas
9. **O jogo iniciará automaticamente!**

## 🚀 DEPLOY NO RAILWAY:

### 1. Acesse: https://railway.app
### 2. Faça login com GitHub
### 3. Clique "New Project"
### 4. Selecione "Deploy from GitHub repo"
### 5. Escolha seu repositório
### 6. Railway detectará automaticamente:
   - ✅ `package.json` com `"start": "node server-railway.js"`
   - ✅ Dependências: `express` e `socket.io`
   - ✅ Porta: `process.env.PORT || 3000`

### 7. Railway fará o deploy automaticamente!

## 📁 ARQUIVOS IMPORTANTES:

- ✅ **`server-railway.js`** - Servidor que funciona
- ✅ **`package.json`** - Configuração atualizada
- ✅ **`public/index.html`** - Interface do jogo
- ✅ **`public/script.js`** - JavaScript corrigido
- ✅ **`public/style.css`** - Estilos

## 🔧 SOLUÇÃO DE PROBLEMAS:

### Se o servidor não iniciar:
1. Verifique se Node.js está instalado: `node --version`
2. Reinstale as dependências: `npm install`
3. Tente executar: `node server-railway.js`

### Se não conectar:
1. Verifique se o servidor está rodando
2. Abra `http://localhost:3000` no navegador
3. Abra o console do navegador (F12) para ver erros

## 📝 NOTAS:

- **Funciona localmente:** Para testar
- **Funciona no Railway:** Para jogar online
- **Sem PowerShell:** Usa apenas cmd
- **Multiplayer real:** Conecta jogadores em tempo real

---

**Execute com cmd e teste o multiplayer!**
