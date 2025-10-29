class QuizGame {
    constructor() {
        this.socket = io();
        this.playerId = null;
        this.playerName = null;
        this.currentScreen = 'login';
        this.selectedAnswer = null;
        this.gameStarted = false;

        this.initializeElements();
        this.setupEventListeners();
        this.setupSocketListeners();
    }

    initializeElements() {
        // Screens
        this.loginScreen = document.getElementById('loginScreen');
        this.waitingScreen = document.getElementById('waitingScreen');
        this.gameScreen = document.getElementById('gameScreen');
        this.rankingScreen = document.getElementById('rankingScreen');
        this.liveRanking = document.getElementById('liveRanking');

        // Login elements
        this.playerNameInput = document.getElementById('playerName');
        this.joinButton = document.getElementById('joinGame');

        // Waiting elements
        this.playersList = document.getElementById('playersList');
        this.playerCount = document.getElementById('playerCount');
        this.startGameBtn = document.getElementById('startGameBtn');

        // Game elements
        this.currentPlayerSpan = document.getElementById('currentPlayer');
        this.currentScoreSpan = document.getElementById('currentScore');
        this.timeLeftSpan = document.getElementById('timeLeft');
        this.questionText = document.getElementById('questionText');
        this.questionProgress = document.getElementById('questionProgress');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.gameStatus = document.getElementById('gameStatus');
        this.explanation = document.getElementById('explanation');

        // Ranking elements
        this.rankingList = document.getElementById('rankingList');
        this.playAgainButton = document.getElementById('playAgain');
        this.liveRankingList = document.getElementById('liveRankingList');
    }

    setupEventListeners() {
        // Login
        this.joinButton.addEventListener('click', () => this.joinGame());
        this.playerNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.joinGame();
        });

        // Start game button
        this.startGameBtn.addEventListener('click', () => this.startGame());

        // Play again
        this.playAgainButton.addEventListener('click', () => this.restartGame());
    }

    setupSocketListeners() {
        // Conectado ao servidor
        this.socket.on('joined', (data) => {
            this.playerId = data.playerId;
            this.playerName = data.playerName;
            this.currentPlayerSpan.textContent = this.playerName;
            this.showScreen('waiting');
        });

        // Lista de jogadores atualizada
        this.socket.on('playersUpdate', (players) => {
            this.updatePlayersList(players);
        });

        // Ranking atualizado
        this.socket.on('rankingUpdate', (ranking) => {
            this.updateLiveRanking(ranking);
        });

        // Jogo iniciado
        this.socket.on('gameStart', () => {
            this.gameStarted = true;
            this.showScreen('game');
            this.gameStatus.textContent = 'O jogo começou! Prepare-se...';
            this.explanation.textContent = '';
        });

        // Nova pergunta
        this.socket.on('newQuestion', (data) => {
            this.showQuestion(data.question, data.questionNumber, data.totalQuestions);
        });

        // Atualização do tempo
        this.socket.on('timeUpdate', (timeLeft) => {
            this.timeLeftSpan.textContent = timeLeft;
            
            // Mudar cor do timer conforme o tempo diminui
            const timer = document.querySelector('.timer');
            if (timeLeft <= 10) {
                timer.style.background = '#ff4757';
            } else if (timeLeft <= 20) {
                timer.style.background = '#ffa502';
            } else {
                timer.style.background = '#ff6b6b';
            }
        });

        // Mostrar resposta
        this.socket.on('showAnswer', (data) => {
            this.showAnswer(data.correctAnswer, data.correctOption, data.answers, data.explanation);
        });

        // Resposta recebida
        this.socket.on('answerReceived', (answer) => {
            this.gameStatus.textContent = 'Resposta enviada! Aguardando outros jogadores...';
        });

        // Jogo finalizado
        this.socket.on('gameEnd', (finalRanking) => {
            this.showFinalRanking(finalRanking);
        });

        // Jogo parado
        this.socket.on('gameStopped', (reason) => {
            this.gameStatus.textContent = reason;
            this.gameStarted = false;
        });
    }

    joinGame() {
        const name = this.playerNameInput.value.trim();
        if (!name) {
            alert('Por favor, digite seu nome!');
            return;
        }

        this.socket.emit('joinGame', name);
    }

    startGame() {
        this.socket.emit('startGame');
    }

    showScreen(screenName) {
        // Esconder todas as telas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Mostrar tela selecionada
        switch(screenName) {
            case 'login':
                this.loginScreen.classList.add('active');
                break;
            case 'waiting':
                this.waitingScreen.classList.add('active');
                break;
            case 'game':
                this.gameScreen.classList.add('active');
                break;
            case 'ranking':
                this.rankingScreen.classList.add('active');
                break;
        }

        this.currentScreen = screenName;
    }

    updatePlayersList(players) {
        this.playerCount.textContent = players.length;
        
        this.playersList.innerHTML = '';
        players.forEach(player => {
            const playerTag = document.createElement('div');
            playerTag.className = 'player-tag';
            playerTag.textContent = player.name;
            this.playersList.appendChild(playerTag);
        });

        // Mostrar botão de iniciar se há jogadores suficientes
        if (players.length >= 2) {
            this.startGameBtn.style.display = 'block';
        } else {
            this.startGameBtn.style.display = 'none';
        }
    }

    updateLiveRanking(ranking) {
        this.liveRankingList.innerHTML = '';
        
        ranking.forEach((player, index) => {
            const item = document.createElement('div');
            item.className = 'live-ranking-item';
            
            if (index < 3) {
                item.classList.add('top3');
            }

            const position = document.createElement('span');
            position.className = 'live-position';
            position.textContent = index < 3 ? `#${index + 1}` : '';

            const name = document.createElement('span');
            name.className = 'live-name';
            name.textContent = player.name;

            const score = document.createElement('span');
            score.className = 'live-score';
            score.textContent = player.score;

            item.appendChild(position);
            item.appendChild(name);
            item.appendChild(score);
            this.liveRankingList.appendChild(item);
        });
    }

    showQuestion(question, questionNumber, totalQuestions) {
        this.selectedAnswer = null;
        this.questionProgress.textContent = `Pergunta ${questionNumber} de ${totalQuestions}`;
        this.gameStatus.textContent = 'Escolha sua resposta!';
        this.explanation.textContent = '';
        
        this.questionText.textContent = question.question;
        this.optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            
            optionElement.addEventListener('click', () => {
                if (this.selectedAnswer !== null) return; // Já respondeu
                
                this.selectedAnswer = index;
                this.socket.emit('answer', index);
                
                // Destacar opção selecionada
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionElement.classList.add('selected');
            });

            this.optionsContainer.appendChild(optionElement);
        });
    }

    showAnswer(correctAnswer, correctOption, answers, explanation) {
        // Destacar resposta correta
        const options = document.querySelectorAll('.option');
        options[correctAnswer].classList.add('correct');

        // Destacar respostas incorretas
        options.forEach((option, index) => {
            if (index !== correctAnswer && answers[this.playerId] === index) {
                option.classList.add('incorrect');
            }
        });

        // Mostrar status
        if (answers[this.playerId] === correctAnswer) {
            this.gameStatus.textContent = `✅ Correto!`;
        } else {
            this.gameStatus.textContent = `❌ Incorreto! A resposta correta era: ${correctOption}`;
        }

        // Mostrar explicação
        this.explanation.textContent = explanation;
    }

    showFinalRanking(ranking) {
        this.showScreen('ranking');
        this.rankingList.innerHTML = '';

        ranking.forEach((player, index) => {
            const item = document.createElement('div');
            item.className = 'ranking-item';
            
            if (index < 3) {
                item.classList.add('top3');
            } else {
                item.classList.add('other');
            }

            const position = document.createElement('span');
            position.className = 'ranking-position';
            position.textContent = index < 3 ? `#${index + 1}` : '';

            const name = document.createElement('span');
            name.className = 'ranking-name';
            name.textContent = player.name;

            const score = document.createElement('span');
            score.className = 'ranking-score';
            score.textContent = `${player.score} pontos`;

            item.appendChild(position);
            item.appendChild(name);
            item.appendChild(score);
            this.rankingList.appendChild(item);
        });
    }

    restartGame() {
        this.socket.emit('restartGame');
        this.showScreen('waiting');
        this.gameStarted = false;
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
