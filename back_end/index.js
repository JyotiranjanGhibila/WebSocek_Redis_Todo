const express = require('express');
const http = require('http');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const setupSocket = require('./config/soket');
const getAllTasks = require('./routes/task.routes');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = setupSocket(server);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/tasks', getAllTasks);

const startServer = async () => {
  try {
    await connectDB();
    console.log('Database connected');
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Something went wrong:', err);
  }
};

startServer();
