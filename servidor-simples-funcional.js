const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json'
};

// Servir arquivos estáticos
function serveFile(res, filePath) {
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Arquivo não encontrado');
            return;
        }
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Criar servidor
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    
    // Verificar se arquivo existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404);
            res.end('Arquivo não encontrado');
            return;
        }
        
        serveFile(res, filePath);
    });
});

server.listen(PORT, () => {
    console.log('========================================');
    console.log('   🎮 SERVIDOR SIMPLES FUNCIONANDO!');
    console.log('========================================');
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
    console.log('');
    console.log('📋 TESTE:');
    console.log('1. Abra http://localhost:3000');
    console.log('2. Digite seu nome');
    console.log('3. Clique "Entrar no Jogo"');
    console.log('4. Veja a tela de espera');
    console.log('');
    console.log('⚠️  NOTA: Este servidor serve apenas os arquivos HTML/CSS/JS');
    console.log('   Para funcionalidade completa, use o servidor com Socket.io');
    console.log('');
    console.log('🛑 Para parar: Ctrl+C');
    console.log('========================================');
});
