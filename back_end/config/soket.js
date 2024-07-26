const socketIO = require('socket.io');
const client = require('./redis');
const cors = require('cors')
const Task = require('../models/Task');

const setupSocket = (server) => {
    const io = socketIO(server, {
        cors: {
          origin: "http://localhost:3000", // Replace with your client URL
          methods: ["GET", "POST"]
        }
      });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('add', async (task) => {
      const tasks = await client.get(`FULLSTACK_TASK_${'Jyotiranjan'}`);
      let tasksArray = tasks ? JSON.parse(tasks) : [];
      tasksArray.push(task);

      if (tasksArray.length > 50) {
        await Task.insertMany(tasksArray);
        await client.set(`FULLSTACK_TASK_${'Jyotiranjan'}`, JSON.stringify([]));
      } else {
        await client.set(`FULLSTACK_TASK_${'Jyotiranjan'}`, JSON.stringify(tasksArray));
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = setupSocket;
