const http = require('http');
const socket = require('socket.io');
const app = require('./app');

const httpServer = http.createServer(app);

require('dotenv').config();

// app.use(cors());

const PORT = process.env.API_PORT || 3001;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

const io = socket(httpServer, {
  cors: {
    origin: `http://${HOSTNAME}:3000`,
    methods: ['GET', 'POST', 'PUT'],
  },
});

// require('../sockets/orders')(io);

io.on('connect', (connectedSocket) => {
  // console.log(' ### ', connectedSocket, ' se conectou!');
  connectedSocket.on('statusUpdate', ({ id, status }) => {
    console.log(' ### ', 'ID: ', id, 'Status alterado para: ', status);
    io.emit('statusUpdate', { id, status });
  });
});

httpServer.listen(PORT, () => console.log(' ### ', `Api rodando na porta ${PORT}`));
