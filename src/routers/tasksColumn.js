const express = require('express');
const TasksColumn = require('../models/TasksColumn');
const router = express.Router();

router.get('/:userId/tasks-columns', async(req, res) => {
  try {
    const userId = req.params.userId;
    const tasksColumns = await TasksColumn.find({ userId });

    console.log(tasksColumns);
    res.status(200).send(tasksColumns);
  } catch(err) {
    res.status(400).send(err);
  }
})

router.post('/tasks-column', async(req, res) => {
  try {
    const tasksColumn = await TasksColumn.create(req.body);

    res.status(200).send(tasksColumn);
  } catch (err) {
    res.status(400).send(err);
  }
})

router.delete('/tasks-columns/:tasksColumnId', async(req, res) => {
  try {
    const { tasksColumnId }  = req.params;
    await TasksColumn.findByIdAndDelete(tasksColumnId);

    res.send(200);
  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = router;
