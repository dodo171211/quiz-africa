# 🔍 DEBUG - RANKING EM BRANCO

## ✅ CORREÇÕES APLICADAS:

1. **Logs adicionados** no cliente e servidor
2. **Verificação de dados** antes de mostrar ranking
3. **Debug completo** para identificar o problema

## 🎯 COMO TESTAR E DEBUGAR:

### 1. Execute o servidor:
```
node server-railway.js
```

### 2. Abra o navegador:
```
http://localhost:3000
```

### 3. Abra o Console do Navegador:
- Pressione **F12**
- Vá na aba **Console**
- Deixe aberto durante o teste

### 4. Teste o jogo completo:
1. **Digite seu nome** e entre
2. **Abra OUTRA ABA** do navegador
3. **Digite outro nome** e entre
4. **Clique "Estou Pronto!"** nas duas abas
5. **Responda as perguntas** normalmente
6. **Na última pergunta:** deixe o tempo acabar

### 5. Verifique os logs no Console:

**No Console do Navegador, você deve ver:**
```
🎯 Evento gameEnded recebido: {ranking: [...]}
🏆 Mostrando ranking final: [...]
👤 Jogador 1: {name: "...", score: ...}
👤 Jogador 2: {name: "...", score: ...}
```

**No Terminal do Servidor, você deve ver:**
```
🏆 Finalizando jogo...
🏆 Jogo finalizado! Ranking: [...]
📤 Enviando evento gameEnded para 2 jogadores
```

## 🔧 POSSÍVEIS PROBLEMAS:

### Se NÃO aparecer nada no console:
- ❌ **Problema:** Evento não está sendo enviado
- ✅ **Solução:** Verificar se o servidor está funcionando

### Se aparecer "❌ Dados do ranking não encontrados":
- ❌ **Problema:** Servidor enviando dados incorretos
- ✅ **Solução:** Verificar estrutura dos dados

### Se aparecer "❌ Elemento rankingList não encontrado":
- ❌ **Problema:** HTML não tem o elemento
- ✅ **Solução:** Verificar se `id="rankingList"` existe

### Se aparecer logs mas tela em branco:
- ❌ **Problema:** CSS ou JavaScript de exibição
- ✅ **Solução:** Verificar se `showScreen('ranking')` funciona

## 📝 TESTE ESPECÍFICO:

1. **Execute o jogo** até a última pergunta
2. **Deixe o tempo acabar**
3. **Verifique o console** do navegador
4. **Me diga quais logs aparecem**

---

**Teste agora e me diga o que aparece no console!**
