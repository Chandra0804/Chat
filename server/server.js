const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./Routes/routes');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());

const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = socketIo(server, {
  cors: {
    origins: ["http://localhost:5173",
    "https://chat-ipc78zy7v-chandra-sai-teja-adhikarlas-projects.vercel.app/"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Mongoose connection
mongoose.connect('mongodb+srv://Chandra:Chandra0804@cluster0.kljowvg.mongodb.net/chat')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

io.on('connection', (socket) => {
  console.log('New client connected');

  const token = socket.handshake.auth.token;
  if (!token) {
      console.log('No token provided');
      return socket.disconnect();
  }

  let userId;
  try {
      const decoded = jwt.verify(token, 'your_secret_key');
      userId = decoded.userId;
      socket.join(userId);
  } catch (err) {
      console.log('Invalid token');
      return socket.disconnect();
  }

  socket.on('message', (message) => {
      console.log('message received:', message);
      io.to(message.recipientId).emit('message', message); // Emit to the recipient
      io.to(message.sender).emit('message', message); // Emit to the sender
  });

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
