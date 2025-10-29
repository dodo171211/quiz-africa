const express = require('express');
const path = require('path');

const app = express();

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de teste
app.get('/test', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando!',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('========================================');
    console.log('   SERVIDOR DE TESTE INICIADO');
    console.log('========================================');
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log(`Teste: http://localhost:${PORT}/test`);
    console.log('');
    console.log('Se conseguir acessar /test, o servidor está funcionando!');
    console.log('Se não conseguir entrar no jogo, pode ser problema com Socket.io');
    console.log('');
    console.log('Para parar: Ctrl+C');
    console.log('========================================');
});
