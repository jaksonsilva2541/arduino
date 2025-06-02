require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mariadb = require('mariadb');
const cors = require('cors');
const cron = require('node-cron');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

// Config MariaDB
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5,
});

// Variável para guardar nível atual
let nivelAtual = 0;

// Config Serial
const serialPortPath = process.env.SERIAL_PORT || '/dev/ttyUSB0';
const serialBaud = parseInt(process.env.SERIAL_BAUD) || 9600;

const port = new SerialPort({
  path: serialPortPath,
  baudRate: serialBaud
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (data) => {
  const valor = parseFloat(data);
  if (!isNaN(valor)) {
    nivelAtual = valor;
    io.emit('nivelAtualizado', nivelAtual);
    console.log(`Nível recebido: ${nivelAtual} cm`);
  }
});

port.on('error', (err) => {
  console.error('Erro na porta serial:', err.message);
});

// Servir frontend estático da pasta public
app.use(express.static('public'));

// API teste (opcional)
app.get('/api/nivel', (req, res) => {
  res.json({ nivel: nivelAtual });
});

// Salvar no banco a cada 1 minuto
cron.schedule('*/1 * * * *', async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO niveis_agua (nivel, data_hora) VALUES (?, NOW())', [nivelAtual]);
    conn.release();
    console.log(`Salvo no banco: ${nivelAtual} cm`);
  } catch (err) {
    console.error('Erro ao salvar no banco:', err);
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  socket.emit('nivelAtualizado', nivelAtual);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// Adicione esta rota para obter dados históricos
app.get('/api/historico', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM niveis_agua ORDER BY data_hora DESC LIMIT 100');
    conn.release();
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar histórico:', err);
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
});

// Modifique o tratamento de conexão do Socket.IO
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  
  // Envia o nível atual imediatamente
  socket.emit('nivelAtualizado', nivelAtual);
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});