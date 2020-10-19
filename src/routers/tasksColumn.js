const express = require('express');
const TasksColumn = require('../models/TasksColumn');
const router = express.Router();

router.post('/tasks-column', async(req, res) => {
  try {
    const tasksColumn = await TasksColumn.create(req.body);

    console.log(tasksColumn);

    res.status(200).send(TasksColumn.toResponce(tasksColumn));
  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = router;
