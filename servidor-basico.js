const express = require('express');
const path = require('path');

const app = express();

// Servir arquivos estáticos
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
        time: new Date().toLocaleString()
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('========================================');
    console.log('   SERVIDOR FUNCIONANDO!');
    console.log('========================================');
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
    console.log(`🧪 Teste: http://localhost:${PORT}/test`);
    console.log('');
    console.log('📋 INSTRUCOES:');
    console.log('1. Abra http://localhost:3000');
    console.log('2. Digite seu nome');
    console.log('3. Clique "Entrar no Jogo"');
    console.log('4. Veja a nova tela de espera!');
    console.log('');
    console.log('🛑 Para parar: Ctrl+C');
    console.log('========================================');
});
