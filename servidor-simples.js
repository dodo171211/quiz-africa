const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de debug
app.get('/debug', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'debug.html'));
});

// Rota de teste
app.get('/test', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando!',
        timestamp: new Date().toISOString(),
        socket: 'Socket.io carregado'
    });
});

// Socket.io - versão simplificada
io.on('connection', (socket) => {
    console.log(`✅ Jogador conectado: ${socket.id}`);

    // Jogador entra no jogo
    socket.on('joinGame', (playerName) => {
        console.log(`📝 ${playerName} tentou entrar no jogo`);
        
        // Resposta simples para testar
        socket.emit('joined', {
            playerId: socket.id,
            playerName: playerName,
            maxPlayers: 18,
            currentPlayers: 1
        });
        
        console.log(`✅ ${playerName} entrou no jogo`);
    });

    // Teste de conexão
    socket.on('test', (data) => {
        console.log(`🧪 Teste recebido: ${data}`);
        socket.emit('testResponse', 'pong');
    });

    // Jogador desconecta
    socket.on('disconnect', () => {
        console.log(`❌ Jogador desconectado: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('========================================');
    console.log('   SERVIDOR SIMPLIFICADO INICIADO');
    console.log('========================================');
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
    console.log(`🔍 Debug: http://localhost:${PORT}/debug`);
    console.log(`🧪 Teste: http://localhost:${PORT}/test`);
    console.log('');
    console.log('📋 Para testar:');
    console.log('1. Abra http://localhost:3000');
    console.log('2. Digite seu nome');
    console.log('3. Clique "Entrar no Jogo"');
    console.log('4. Se não funcionar, use /debug');
    console.log('');
    console.log('🛑 Para parar: Ctrl+C');
    console.log('========================================');
});
