# Quiz de Urbanização da África - Multiplayer

Um jogo de quiz multiplayer online sobre urbanização africana, desenvolvido com Node.js e Socket.io.

## 🎯 Características

- **Multiplayer em tempo real**: Compete com outros jogadores simultaneamente
- **Ranking ao vivo**: Veja sua posição atualizada em tempo real
- **Perguntas especializadas**: 10 perguntas sobre urbanização africana
- **Sistema de pontuação**: Pontos baseados na velocidade e precisão
- **Interface moderna**: Design responsivo e intuitivo

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm

### Instalação

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar o servidor:**
   ```bash
   npm start
   ```
   ou
   ```bash
   node server.js
   ```

3. **Acessar o jogo:**
   - Abra seu navegador
   - Acesse: `http://localhost:3000`

## 🎮 Como Jogar

1. **Entrar no jogo**: Digite seu nome e clique em "Entrar no Jogo"
2. **Aguardar jogadores**: O jogo precisa de pelo menos 2 jogadores
3. **Responder perguntas**: Você tem 30 segundos para cada pergunta
4. **Competir**: Veja seu ranking atualizado em tempo real
5. **Ranking final**: Veja quem ganhou no final!

## 📁 Estrutura do Projeto

```
├── server.js          # Servidor Node.js com Socket.io
├── package.json       # Dependências e scripts
├── public/            # Arquivos do front-end
│   ├── index.html    # Interface do jogo
│   ├── style.css     # Estilos CSS
│   └── script.js     # Lógica do cliente
└── README.md         # Este arquivo
```

## 🔧 Tecnologias Utilizadas

- **Backend**: Node.js, Express, Socket.io
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Comunicação**: WebSockets para tempo real

## 🌍 Perguntas Incluídas

O jogo inclui 10 perguntas sobre:
- Cidades mais populosas da África
- Taxas de urbanização por país
- Desafios da urbanização
- Crescimento populacional urbano
- Migração rural-urbana
- Desenvolvimento tecnológico
- E muito mais!

## 🚀 Deploy Online

Para subir o jogo online, você pode usar:

- **Heroku**: Adicione um `Procfile` com `web: node server.js`
- **Vercel**: Configure como aplicação Node.js
- **Railway**: Deploy direto do GitHub
- **DigitalOcean**: Droplet com Node.js

### Variáveis de Ambiente
```bash
PORT=3000  # Porta do servidor (opcional)
```

## 🎯 Funcionalidades Multiplayer

- **Conexão em tempo real**: Socket.io para comunicação instantânea
- **Sincronização de perguntas**: Todos veem a mesma pergunta simultaneamente
- **Ranking dinâmico**: Atualização automática das pontuações
- **Gerenciamento de jogadores**: Controle de entrada/saída de jogadores
- **Sistema de pontuação**: Pontos baseados em velocidade e precisão

## 🏆 Sistema de Pontuação

- **Resposta correta**: 10 pontos base + pontos de velocidade
- **Pontos de velocidade**: Até 60 pontos extras (30 segundos × 2)
- **Resposta incorreta**: 0 pontos
- **Sem resposta**: 0 pontos

## 📱 Responsividade

O jogo é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Smartphones
- 📟 Tablets

## 🤝 Contribuição

Sinta-se à vontade para contribuir com:
- Novas perguntas sobre urbanização africana
- Melhorias na interface
- Correções de bugs
- Novas funcionalidades

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

---

**Desenvolvido com ❤️ para aprender sobre urbanização africana!**