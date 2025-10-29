const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Banco de dados em memória
const players = new Map();
const gameState = {
    isRunning: false,
    currentQuestion: null,
    questionIndex: 0,
    timeLeft: 30,
    answers: new Map()
};

// Perguntas de geografia
const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correct: 2
    },
    {
        question: "Qual é o maior oceano do mundo?",
        options: ["Atlântico", "Índico", "Pacífico", "Ártico"],
        correct: 2
    },
    {
        question: "Em que continente está localizado o Egito?",
        options: ["Ásia", "África", "Europa", "América"],
        correct: 1
    },
    {
        question: "Qual é o país mais populoso do mundo?",
        options: ["Índia", "China", "Estados Unidos", "Brasil"],
        correct: 1
    },
    {
        question: "Qual é a montanha mais alta do mundo?",
        options: ["K2", "Everest", "Kilimanjaro", "Aconcágua"],
        correct: 1
    },
    {
        question: "Qual é o maior rio do mundo em volume de água?",
        options: ["Nilo", "Amazonas", "Mississippi", "Ganges"],
        correct: 1
    },
    {
        question: "Em que país está localizada a cidade de Tóquio?",
        options: ["China", "Coreia do Sul", "Japão", "Tailândia"],
        correct: 2
    },
    {
        question: "Qual é o deserto mais quente do mundo?",
        options: ["Saara", "Atacama", "Gobi", "Antártico"],
        correct: 0
    },
    {
        question: "Qual é o menor país do mundo?",
        options: ["Mônaco", "Vaticano", "San Marino", "Liechtenstein"],
        correct: 1
    },
    {
        question: "Qual é a capital da Austrália?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correct: 2
    }
];

// Função para obter ranking
function getRanking() {
    return Array.from(players.values())
        .sort((a, b) => b.score - a.score)
        .map((player, index) => ({
            ...player,
            position: index + 1
        }));
}

// Função para enviar ranking atualizado
function broadcastRanking() {
    const ranking = getRanking();
    io.emit('rankingUpdate', ranking);
}

// Função para iniciar nova pergunta
function startNewQuestion() {
    if (gameState.questionIndex >= questions.length) {
        endGame();
        return;
    }

    gameState.currentQuestion = questions[gameState.questionIndex];
    gameState.timeLeft = 30;
    gameState.answers.clear();

    io.emit('newQuestion', {
        question: gameState.currentQuestion,
        questionNumber: gameState.questionIndex + 1,
        totalQuestions: questions.length
    });

    // Timer da pergunta
    const timer = setInterval(() => {
        gameState.timeLeft--;
        io.emit('timeUpdate', gameState.timeLeft);

        if (gameState.timeLeft <= 0) {
            clearInterval(timer);
            showAnswer();
        }
    }, 1000);
}

// Função para mostrar resposta
function showAnswer() {
    const correctAnswer = gameState.currentQuestion.correct;
    const correctOption = gameState.currentQuestion.options[correctAnswer];

    // Calcular pontuação para cada jogador
    gameState.answers.forEach((answer, playerId) => {
        const player = players.get(playerId);
        if (player) {
            if (answer === correctAnswer) {
                // Pontuação baseada no tempo restante
                const timeBonus = Math.floor(gameState.timeLeft * 2);
                player.score += 10 + timeBonus;
            }
        }
    });

    io.emit('showAnswer', {
        correctAnswer,
        correctOption,
        answers: Object.fromEntries(gameState.answers)
    });

    broadcastRanking();

    // Próxima pergunta após 3 segundos
    setTimeout(() => {
        gameState.questionIndex++;
        startNewQuestion();
    }, 3000);
}

// Função para finalizar jogo
function endGame() {
    gameState.isRunning = false;
    const finalRanking = getRanking();
    io.emit('gameEnd', finalRanking);
}

// Função para iniciar jogo
function startGame() {
    if (players.size < 2) return;

    gameState.isRunning = true;
    gameState.questionIndex = 0;
    
    // Resetar pontuações
    players.forEach(player => {
        player.score = 0;
    });

    io.emit('gameStart');
    broadcastRanking();
    
    setTimeout(() => {
        startNewQuestion();
    }, 2000);
}

// Eventos do Socket.io
io.on('connection', (socket) => {
    console.log('Jogador conectado:', socket.id);

    // Jogador se conecta
    socket.on('joinGame', (playerName) => {
        if (players.has(socket.id)) return;

        players.set(socket.id, {
            id: socket.id,
            name: playerName,
            score: 0,
            connected: true
        });

        socket.emit('joined', {
            playerId: socket.id,
            playerName: playerName
        });

        // Enviar lista de jogadores
        io.emit('playersUpdate', Array.from(players.values()));

        // Iniciar jogo se houver pelo menos 2 jogadores e não estiver rodando
        if (players.size >= 2 && !gameState.isRunning) {
            setTimeout(() => {
                startGame();
            }, 3000);
        }

        broadcastRanking();
    });

    // Jogador responde pergunta
    socket.on('answer', (answer) => {
        if (!gameState.isRunning || !gameState.currentQuestion) return;
        if (gameState.answers.has(socket.id)) return; // Já respondeu

        gameState.answers.set(socket.id, answer);
        
        // Confirmar resposta
        socket.emit('answerReceived', answer);
    });

    // Jogador desconecta
    socket.on('disconnect', () => {
        console.log('Jogador desconectado:', socket.id);
        
        if (players.has(socket.id)) {
            players.delete(socket.id);
            gameState.answers.delete(socket.id);
            
            io.emit('playersUpdate', Array.from(players.values()));
            broadcastRanking();

            // Se não há jogadores suficientes, parar o jogo
            if (players.size < 2 && gameState.isRunning) {
                gameState.isRunning = false;
                io.emit('gameStopped', 'Não há jogadores suficientes');
            }
        }
    });

    // Reiniciar jogo
    socket.on('restartGame', () => {
        if (players.size >= 2) {
            startGame();
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
