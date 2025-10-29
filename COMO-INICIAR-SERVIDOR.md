# 🎮 GUIA PARA EXECUTAR O SERVIDOR MULTIPLAYER

## ✅ PASSOS SIMPLES:

### 1. Abra o PowerShell ou Prompt de Comando

### 2. Navegue até a pasta do projeto:
```
cd "C:\Users\Douglas\OneDrive\Área de Trabalho\jogo geografia"
```

### 3. Instale as dependências (se ainda não instalou):
```
npm install express socket.io
```

### 4. Inicie o servidor:
```
node server.js
```

### 5. Acesse no navegador:
```
http://localhost:3000
```

## 🎯 TESTAR MULTIPLAYER:

1. **Abra o navegador** em `http://localhost:3000`
2. **Digite seu nome** (ex: "Jogador 1")
3. **Clique "Entrar no Jogo"**
4. **Abra OUTRA ABA** do navegador
5. **Acesse novamente** `http://localhost:3000`
6. **Digite outro nome** (ex: "Jogador 2")
7. **Clique "Entrar no Jogo"** na segunda aba
8. **Clique "Estou Pronto!"** nas duas abas
9. **O jogo iniciará automaticamente!**

## ✅ ARQUIVOS IMPORTANTES:

- `server.js` - **Servidor multiplayer principal**
- `public/index.html` - **Interface do jogo**
- `public/script.js` - **Lógica do cliente**
- `public/style.css` - **Estilos**

## 🔧 SOLUÇÃO DE PROBLEMAS:

### Se o servidor não iniciar:
1. Verifique se Node.js está instalado: `node --version`
2. Reinstale as dependências: `npm install`
3. Tente executar: `node server.js`

### Se não conectar:
1. Verifique se o servidor está rodando
2. Abra `http://localhost:3000` no navegador
3. Abra o console do navegador (F12) para ver erros

## 📝 NOTAS:

- **Servidor já existe:** Use `server.js` que está na raiz do projeto
- **Já tem Socket.io:** As dependências já estão instaladas
- **Funciona localmente:** Para jogar com amigos, você precisa publicar online (Heroku/Railway)

---

**Execute manualmente seguindo os passos acima!**
