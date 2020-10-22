const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:tasksColumnId/tasks', async(req, res) => {
  const { tasksColumnId } = req.params;

  const tasks = await Task.find({ tasksColumnId });
  console.log(tasks);

  res.status(200).send(tasks);
})

router.post('/task/', async(req, res) => {
  try {
    console.log(req.body);
    const task = await Task.create(req.body);
    console.log(task);

    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = router;
