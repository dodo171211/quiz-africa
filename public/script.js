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
        this.maxPlayers = document.getElementById('maxPlayers');
        this.readyCount = document.getElementById('readyCount');
        this.totalPlayers = document.getElementById('totalPlayers');
        this.readyBtn = document.getElementById('readyBtn');
        this.autoStartWarning = document.getElementById('autoStartWarning');
        this.autoStartMessage = document.getElementById('autoStartMessage');
        this.countdownTimer = document.getElementById('countdownTimer');

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

        // Ready button
        this.readyBtn.addEventListener('click', () => this.toggleReady());

        // Play again
        this.playAgainButton.addEventListener('click', () => this.restartGame());
    }

    setupSocketListeners() {
        // Conectado ao servidor
        this.socket.on('joined', (data) => {
            this.playerId = data.playerId;
            this.playerName = data.playerName;
            if (this.currentPlayerSpan) this.currentPlayerSpan.textContent = this.playerName;
            if (this.maxPlayers) this.maxPlayers.textContent = data.maxPlayers || 18;
            this.showScreen('waiting');
        });

        // Lista de jogadores atualizada
        this.socket.on('playerJoined', (data) => {
            this.updatePlayersList(data.players);
        });

        // Jogador pronto
        this.socket.on('playerReady', (data) => {
            this.updatePlayersList(data.players);
        });

        // Jogo iniciado
        this.socket.on('gameStarted', () => {
            this.gameStarted = true;
            this.showScreen('game');
            if (this.gameStatus) this.gameStatus.textContent = 'O jogo começou! Prepare-se...';
            if (this.explanation) this.explanation.textContent = '';
        });

        // Nova pergunta
        this.socket.on('newQuestion', (data) => {
            this.showQuestion(data, data.questionNumber, data.totalQuestions);
        });

        // Atualização do tempo
        this.socket.on('timeUpdate', (timeLeft) => {
            if (this.timeLeftSpan) this.timeLeftSpan.textContent = timeLeft;
            
            // Mudar cor do timer conforme o tempo diminui
            const timer = document.querySelector('.timer');
            if (timer) {
                if (timeLeft <= 10) {
                    timer.style.background = '#ff4757';
                } else if (timeLeft <= 20) {
                    timer.style.background = '#ffa502';
                } else {
                    timer.style.background = '#ff6b6b';
                }
            }
        });

        // Mostrar resposta
        this.socket.on('showAnswer', (data) => {
            this.showAnswer(data.correctAnswer, data.correctOption, data.answers, data.explanation);
        });

        // Resposta recebida
        this.socket.on('answerReceived', (answer) => {
            if (this.gameStatus) this.gameStatus.textContent = 'Resposta enviada! Aguardando outros jogadores...';
        });

        // Jogo finalizado
        this.socket.on('gameEnded', (data) => {
            this.showFinalRanking(data.ranking);
        });

        // Jogo parado
        this.socket.on('gameStopped', (reason) => {
            if (this.gameStatus) this.gameStatus.textContent = reason;
            this.gameStarted = false;
        });

        // Aviso de início automático
        this.socket.on('autoStartWarning', (data) => {
            if (this.autoStartMessage) this.autoStartMessage.textContent = data.message;
            if (this.autoStartWarning) this.autoStartWarning.style.display = 'block';
        });

        // Contagem regressiva
        this.socket.on('autoStartCountdown', (data) => {
            if (this.countdownTimer) this.countdownTimer.textContent = data.countdown;
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

    toggleReady() {
        this.socket.emit('playerReady');
    }

    showScreen(screenName) {
        // Esconder todas as telas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Mostrar tela selecionada
        switch(screenName) {
            case 'login':
                if (this.loginScreen) this.loginScreen.classList.add('active');
                break;
            case 'waiting':
                if (this.waitingScreen) this.waitingScreen.classList.add('active');
                break;
            case 'game':
                if (this.gameScreen) this.gameScreen.classList.add('active');
                break;
            case 'ranking':
                if (this.rankingScreen) this.rankingScreen.classList.add('active');
                break;
        }

        this.currentScreen = screenName;
    }

    updatePlayersList(players) {
        if (this.playerCount) this.playerCount.textContent = players.length;
        if (this.totalPlayers) this.totalPlayers.textContent = players.length;
        
        // Contar jogadores prontos
        const readyCount = players.filter(player => player.ready).length;
        if (this.readyCount) this.readyCount.textContent = readyCount;
        
        if (this.playersList) {
            this.playersList.innerHTML = '';
            players.forEach(player => {
                const playerTag = document.createElement('div');
                playerTag.className = 'player-tag';
                playerTag.textContent = player.name;
                
                if (player.ready) {
                    playerTag.classList.add('ready');
                }
                
                this.playersList.appendChild(playerTag);
            });
        }

        // Atualizar botão pronto
        const currentPlayer = players.find(p => p.id === this.playerId);
        if (currentPlayer && this.readyBtn) {
            if (currentPlayer.ready) {
                this.readyBtn.textContent = 'Pronto!';
                this.readyBtn.classList.add('ready');
                this.readyBtn.disabled = true;
            } else {
                this.readyBtn.textContent = 'Estou Pronto!';
                this.readyBtn.classList.remove('ready');
                this.readyBtn.disabled = false;
            }
        }
    }

    updateLiveRanking(ranking) {
        if (this.liveRankingList) {
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
    }

    showQuestion(questionData, questionNumber, totalQuestions) {
        this.selectedAnswer = null;
        if (this.questionProgress) this.questionProgress.textContent = `Pergunta ${questionNumber} de ${totalQuestions}`;
        if (this.gameStatus) this.gameStatus.textContent = 'Escolha sua resposta!';
        if (this.explanation) this.explanation.textContent = '';
        
        if (this.questionText) this.questionText.textContent = questionData.question;
        if (this.optionsContainer) {
            this.optionsContainer.innerHTML = '';

            questionData.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                
                optionElement.addEventListener('click', () => {
                    if (this.selectedAnswer !== null) return; // Já respondeu
                    
                    this.selectedAnswer = index;
                    this.socket.emit('answer', { answer: index });
                    
                    // Destacar opção selecionada
                    document.querySelectorAll('.option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    optionElement.classList.add('selected');
                });

                this.optionsContainer.appendChild(optionElement);
            });
        }
    }

    showAnswer(correctAnswer, correctOption, answers, explanation) {
        // Destacar resposta correta
        const options = document.querySelectorAll('.option');
        if (options[correctAnswer]) {
            options[correctAnswer].classList.add('correct');
        }

        // Destacar respostas incorretas
        options.forEach((option, index) => {
            if (index !== correctAnswer && answers[this.playerId] === index) {
                option.classList.add('incorrect');
            }
        });

        // Mostrar status
        if (this.gameStatus) {
            if (answers[this.playerId] === correctAnswer) {
                this.gameStatus.textContent = `✅ Correto!`;
            } else {
                this.gameStatus.textContent = `❌ Incorreto! A resposta correta era: ${correctOption}`;
            }
        }

        // Mostrar explicação
        if (this.explanation) {
            this.explanation.textContent = explanation;
        }
    }

    showFinalRanking(ranking) {
        this.showScreen('ranking');
        if (this.rankingList) {
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
