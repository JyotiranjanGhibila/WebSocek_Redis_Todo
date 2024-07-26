const express = require('express');
const router = express.Router();
const client = require('../config/redis');
const Task = require('../models/Task');

router.get('/fetchAllTasks', async (req, res) => {
  try {
    const cachedTasks = await client.get(`FULLSTACK_TASK_${'Jyotiranjan'}`);
    console.log("cachedTasks:", cachedTasks)
    const tasksArray = cachedTasks ? JSON.parse(cachedTasks) : [];
    
    const dbTasks = await Task.find({});
    console.log("dbTasks:", dbTasks)
    const allTasks = [...tasksArray, ...dbTasks];
    console.log("All task:", allTasks);
    res.json(allTasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
