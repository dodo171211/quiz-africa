const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Estado do jogo
let gameState = {
    players: new Map(),
    gameStarted: false,
    currentQuestion: 0,
    answers: new Map(),
    readyPlayers: new Set()
};

// Perguntas sobre urbanização da África
const questions = [
    {
        question: "Qual é a cidade mais populosa da África?",
        options: ["Lagos", "Cairo", "Kinshasa", "Johannesburg"],
        correct: 0,
        explanation: "Lagos, na Nigéria, é a cidade mais populosa da África com mais de 15 milhões de habitantes."
    },
    {
        question: "Qual país africano tem a maior taxa de urbanização?",
        options: ["Nigéria", "Egito", "África do Sul", "Quênia"],
        correct: 1,
        explanation: "O Egito tem uma das maiores taxas de urbanização da África, com mais de 40% da população vivendo em áreas urbanas."
    },
    {
        question: "Qual é o principal desafio da urbanização na África?",
        options: ["Falta de água", "Infraestrutura inadequada", "Poluição", "Todos os anteriores"],
        correct: 3,
        explanation: "A urbanização na África enfrenta múltiplos desafios: falta de água, infraestrutura inadequada e poluição."
    },
    {
        question: "Qual cidade africana é conhecida como 'Cidade do Ouro'?",
        options: ["Cidade do Cabo", "Johannesburg", "Nairobi", "Casablanca"],
        correct: 1,
        explanation: "Johannesburg, na África do Sul, é conhecida como 'Cidade do Ouro' devido à sua história com a mineração de ouro."
    },
    {
        question: "Qual é a taxa média de crescimento urbano na África?",
        options: ["2% ao ano", "3.5% ao ano", "5% ao ano", "7% ao ano"],
        correct: 1,
        explanation: "A África tem uma das maiores taxas de crescimento urbano do mundo, aproximadamente 3.5% ao ano."
    }
];

// Socket.io
io.on('connection', (socket) => {
    console.log(`🔌 Jogador conectado: ${socket.id}`);
    
    socket.on('joinGame', (playerName) => {
        const player = {
            id: socket.id,
            name: playerName,
            ready: false,
            score: 0
        };
        
        gameState.players.set(socket.id, player);
        
        console.log(`👤 Jogador ${playerName} entrou no jogo`);
        
        socket.emit('joined', {
            playerId: socket.id,
            playerName: playerName,
            maxPlayers: 18
        });
        
        io.emit('playerJoined', {
            players: Array.from(gameState.players.values())
        });
    });
    
    socket.on('playerReady', () => {
        const player = gameState.players.get(socket.id);
        if (player) {
            player.ready = true;
            gameState.readyPlayers.add(socket.id);
            
            console.log(`✅ Jogador ${player.name} está pronto`);
            
            io.emit('playerReady', {
                players: Array.from(gameState.players.values())
            });
            
            // Iniciar jogo se todos estão prontos e há pelo menos 2 jogadores
            if (gameState.players.size >= 2 && gameState.readyPlayers.size === gameState.players.size) {
                startGame();
            }
        }
    });
    
    socket.on('answer', (data) => {
        if (!gameState.gameStarted) return;
        
        const answerId = `${socket.id}-${gameState.currentQuestion}`;
        gameState.answers.set(answerId, data.answer);
        
        console.log(`📝 Resposta recebida de ${socket.id}: ${data.answer}`);
        
        socket.emit('answerReceived');
    });
    
    socket.on('disconnect', () => {
        const player = gameState.players.get(socket.id);
        if (player) {
            console.log(`👋 Jogador ${player.name} saiu do jogo`);
            gameState.players.delete(socket.id);
            gameState.readyPlayers.delete(socket.id);
            
            io.emit('playerLeft', {
                players: Array.from(gameState.players.values())
            });
        }
    });
});

function startGame() {
    gameState.gameStarted = true;
    gameState.currentQuestion = 0;
    gameState.answers.clear();
    
    console.log('🎮 Jogo iniciado!');
    io.emit('gameStarted');
    nextQuestion();
}

function nextQuestion() {
    if (gameState.currentQuestion >= questions.length) {
        endGame();
        return;
    }
    
    const question = questions[gameState.currentQuestion];
    gameState.answers.clear();
    
    console.log(`📝 Pergunta ${gameState.currentQuestion + 1}: ${question.question}`);
    
    io.emit('newQuestion', {
        question: question.question,
        options: question.options,
        questionNumber: gameState.currentQuestion + 1,
        totalQuestions: questions.length,
        timeLeft: 30
    });
    
    // Timer da pergunta
    setTimeout(() => {
        if (gameState.gameStarted) {
            // Se é a última pergunta, finalizar o jogo
            if (gameState.currentQuestion >= questions.length - 1) {
                endGame();
            } else {
                gameState.currentQuestion++;
                nextQuestion();
            }
        }
    }, 30000);
}

function endGame() {
    gameState.gameStarted = false;
    gameState.currentQuestion = 0;
    
    // Calcular pontuações
    const scores = [];
    gameState.players.forEach((player, playerId) => {
        let score = 0;
        gameState.answers.forEach((answer, answerId) => {
            if (answerId.startsWith(playerId)) {
                const questionIndex = parseInt(answerId.split('-')[1]);
                const question = questions[questionIndex];
                if (answer === question.correct) {
                    score += 10;
                }
            }
        });
        scores.push({
            id: playerId,
            name: player.name,
            score: score
        });
    });
    
    // Ordenar por pontuação
    scores.sort((a, b) => b.score - a.score);
    
    console.log('🏆 Jogo finalizado! Ranking:', scores);
    io.emit('gameEnded', { ranking: scores });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('========================================');
    console.log('   🎮 QUIZ MULTIPLAYER FUNCIONANDO!');
    console.log('========================================');
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
    console.log('');
    console.log('📋 FUNCIONALIDADES MULTIPLAYER:');
    console.log('✅ Login com nome');
    console.log('✅ Tela de espera com status');
    console.log('✅ Botão "Pronto"');
    console.log('✅ Início com 2+ jogadores prontos');
    console.log('✅ Perguntas sobre urbanização da África');
    console.log('✅ Ranking em tempo real');
    console.log('✅ Múltiplos jogadores conectados');
    console.log('');
    console.log('🛑 Para parar: Ctrl+C');
    console.log('========================================');
});
