const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Perguntas sobre urbanização da África
const questions = [
    {
        question: "Qual é a cidade mais populosa da África?",
        options: ["Cairo", "Lagos", "Kinshasa", "Johannesburg"],
        correct: 0,
        explanation: "Cairo, no Egito, é a cidade mais populosa da África com mais de 20 milhões de habitantes."
    },
    {
        question: "Qual país africano tem a maior taxa de urbanização?",
        options: ["Nigéria", "África do Sul", "Egito", "Quênia"],
        correct: 1,
        explanation: "A África do Sul tem uma das maiores taxas de urbanização da África, com cerca de 67% da população vivendo em áreas urbanas."
    },
    {
        question: "Qual é o principal desafio da urbanização na África?",
        options: ["Falta de água", "Tráfego intenso", "Crescimento desordenado", "Poluição sonora"],
        correct: 2,
        explanation: "O crescimento desordenado das cidades africanas é um dos principais desafios, levando à formação de favelas e infraestrutura inadequada."
    },
    {
        question: "Qual cidade africana é conhecida como 'Cidade do Ouro'?",
        options: ["Johannesburg", "Cidade do Cabo", "Nairobi", "Accra"],
        correct: 0,
        explanation: "Johannesburg, na África do Sul, é conhecida como 'Cidade do Ouro' devido à sua história de mineração de ouro."
    },
    {
        question: "Qual é o nome do fenômeno de migração rural-urbana na África?",
        options: ["Êxodo rural", "Urbanização acelerada", "Migração interna", "Todas as anteriores"],
        correct: 3,
        explanation: "Todos esses termos descrevem aspectos da migração rural-urbana que está transformando a África."
    },
    {
        question: "Qual cidade africana tem o maior crescimento populacional anual?",
        options: ["Lagos", "Cairo", "Kinshasa", "Nairobi"],
        correct: 0,
        explanation: "Lagos, na Nigéria, tem um dos maiores crescimentos populacionais do mundo, crescendo cerca de 2,5% ao ano."
    },
    {
        question: "Qual é o principal motivo da urbanização acelerada na África?",
        options: ["Melhores empregos", "Educação", "Saúde", "Todas as anteriores"],
        correct: 3,
        explanation: "A busca por melhores oportunidades de emprego, educação e saúde são os principais motivos da migração rural-urbana."
    },
    {
        question: "Qual cidade africana é considerada a mais desenvolvida tecnologicamente?",
        options: ["Cidade do Cabo", "Nairobi", "Lagos", "Cairo"],
        correct: 1,
        explanation: "Nairobi, no Quênia, é conhecida como o 'Silicon Savannah' devido ao seu ecossistema tecnológico desenvolvido."
    },
    {
        question: "Qual é o nome das favelas urbanas na África do Sul?",
        options: ["Townships", "Shantytowns", "Settlements", "Slums"],
        correct: 0,
        explanation: "Na África do Sul, as áreas de habitação informal são chamadas de 'townships'."
    },
    {
        question: "Qual cidade africana tem o maior PIB per capita?",
        options: ["Johannesburg", "Cidade do Cabo", "Cairo", "Lagos"],
        correct: 1,
        explanation: "Cidade do Cabo, na África do Sul, tem um dos maiores PIBs per capita entre as cidades africanas."
    }
];

// Estado do jogo
let gameState = {
    players: new Map(),
    gameStarted: false,
    currentQuestion: 0,
    questionStartTime: null,
    answers: new Map(),
    gameTimer: null,
    questionTimer: null
};

// Configurações do jogo
const GAME_CONFIG = {
    QUESTION_TIME: 30, // segundos por pergunta
    MIN_PLAYERS: 2, // mínimo de jogadores para iniciar
    QUESTIONS_PER_GAME: 5 // número de perguntas por jogo
};

// Função para calcular pontuação
function calculateScore(timeLeft, isCorrect) {
    if (!isCorrect) return 0;
    return 10 + Math.floor(timeLeft * 2);
}

// Função para atualizar ranking
function updateRanking() {
    const players = Array.from(gameState.players.values());
    players.sort((a, b) => b.score - a.score);
    return players;
}

// Função para iniciar nova pergunta
function startNewQuestion() {
    if (gameState.currentQuestion >= GAME_CONFIG.QUESTIONS_PER_GAME) {
        endGame();
        return;
    }

    const question = questions[gameState.currentQuestion];
    gameState.questionStartTime = Date.now();
    gameState.answers.clear();

    // Enviar pergunta para todos os jogadores
    io.emit('newQuestion', {
        question: question,
        questionNumber: gameState.currentQuestion + 1,
        totalQuestions: GAME_CONFIG.QUESTIONS_PER_GAME
    });

    // Timer da pergunta
    let timeLeft = GAME_CONFIG.QUESTION_TIME;
    gameState.questionTimer = setInterval(() => {
        io.emit('timeUpdate', timeLeft);
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(gameState.questionTimer);
            showAnswer();
        }
    }, 1000);
}

// Função para mostrar resposta
function showAnswer() {
    const question = questions[gameState.currentQuestion];
    const correctAnswer = question.correct;
    const correctOption = question.options[correctAnswer];
    
    // Calcular pontuações
    gameState.answers.forEach((answer, playerId) => {
        const player = gameState.players.get(playerId);
        const timeLeft = Math.max(0, GAME_CONFIG.QUESTION_TIME - Math.floor((Date.now() - gameState.questionStartTime) / 1000));
        const isCorrect = answer === correctAnswer;
        const points = calculateScore(timeLeft, isCorrect);
        
        player.score += points;
    });

    // Enviar resposta para todos
    io.emit('showAnswer', {
        correctAnswer: correctAnswer,
        correctOption: correctOption,
        answers: Object.fromEntries(gameState.answers),
        explanation: question.explanation
    });

    // Atualizar ranking
    const ranking = updateRanking();
    io.emit('rankingUpdate', ranking);

    // Próxima pergunta após 3 segundos
    setTimeout(() => {
        gameState.currentQuestion++;
        startNewQuestion();
    }, 3000);
}

// Função para iniciar o jogo
function startGame() {
    if (gameState.players.size < GAME_CONFIG.MIN_PLAYERS) {
        return;
    }

    gameState.gameStarted = true;
    gameState.currentQuestion = 0;
    
    // Resetar pontuações
    gameState.players.forEach(player => {
        player.score = 0;
    });

    io.emit('gameStart');
    
    // Iniciar primeira pergunta após 2 segundos
    setTimeout(() => {
        startNewQuestion();
    }, 2000);
}

// Função para finalizar o jogo
function endGame() {
    gameState.gameStarted = false;
    gameState.currentQuestion = 0;
    
    if (gameState.questionTimer) {
        clearInterval(gameState.questionTimer);
    }

    const finalRanking = updateRanking();
    io.emit('gameEnd', finalRanking);
}

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log(`Jogador conectado: ${socket.id}`);

    // Jogador entra no jogo
    socket.on('joinGame', (playerName) => {
        if (gameState.gameStarted) {
            socket.emit('gameStopped', 'O jogo já começou. Aguarde o próximo.');
            return;
        }

        // Adicionar jogador
        gameState.players.set(socket.id, {
            id: socket.id,
            name: playerName,
            score: 0,
            connected: true
        });

        socket.emit('joined', {
            playerId: socket.id,
            playerName: playerName
        });

        // Atualizar lista de jogadores
        const players = Array.from(gameState.players.values());
        io.emit('playersUpdate', players);

        // Atualizar ranking
        const ranking = updateRanking();
        io.emit('rankingUpdate', ranking);

        console.log(`${playerName} entrou no jogo`);
    });

    // Jogador responde pergunta
    socket.on('answer', (answerIndex) => {
        if (!gameState.gameStarted || gameState.answers.has(socket.id)) {
            return;
        }

        gameState.answers.set(socket.id, answerIndex);
        socket.emit('answerReceived', answerIndex);
    });

    // Reiniciar jogo
    socket.on('restartGame', () => {
        if (gameState.gameStarted) {
            return;
        }

        // Resetar estado
        gameState.currentQuestion = 0;
        gameState.answers.clear();
        
        if (gameState.questionTimer) {
            clearInterval(gameState.questionTimer);
        }

        // Resetar pontuações
        gameState.players.forEach(player => {
            player.score = 0;
        });

        // Atualizar ranking
        const ranking = updateRanking();
        io.emit('rankingUpdate', ranking);

        // Iniciar novo jogo se houver jogadores suficientes
        if (gameState.players.size >= GAME_CONFIG.MIN_PLAYERS) {
            startGame();
        }
    });

    // Jogador desconecta
    socket.on('disconnect', () => {
        console.log(`Jogador desconectado: ${socket.id}`);
        
        if (gameState.players.has(socket.id)) {
            const player = gameState.players.get(socket.id);
            console.log(`${player.name} saiu do jogo`);
            
            gameState.players.delete(socket.id);
            
            // Se não há jogadores suficientes, parar o jogo
            if (gameState.gameStarted && gameState.players.size < GAME_CONFIG.MIN_PLAYERS) {
                gameState.gameStarted = false;
                if (gameState.questionTimer) {
                    clearInterval(gameState.questionTimer);
                }
                io.emit('gameStopped', 'Não há jogadores suficientes. O jogo foi pausado.');
            }

            // Atualizar lista de jogadores
            const players = Array.from(gameState.players.values());
            io.emit('playersUpdate', players);

            // Atualizar ranking
            const ranking = updateRanking();
            io.emit('rankingUpdate', ranking);
        }
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});