const express = require('express');
const TasksColumn = require('../models/TasksColumn');
const Task = require('../models/Task');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/:userId/tasks-columns', auth, async(req, res) => {
  try {
    const userId = req.params.userId;
    const tasksColumns = await TasksColumn.find({ userId });

    res.status(200).send(tasksColumns);
  } catch(err) {
    res.status(400).send(err);
  }
})

router.post('/tasks-column', auth, async(req, res) => {
  try {
    const tasksColumn = await TasksColumn.create(req.body);

    res.status(200).send(tasksColumn);
  } catch (err) {
    res.status(400).send(err);
  }
})

router.delete('/tasks-columns/:tasksColumnId', auth, async(req, res) => {
  try {
    const { tasksColumnId }  = req.params;
    await TasksColumn.findByIdAndDelete(tasksColumnId);
    await Task.deleteMany({ tasksColumnId });

    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = router;
