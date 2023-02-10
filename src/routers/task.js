// const express = require('express');
// const Task = require('../models/Task');
// const auth = require('../middleware/auth');
// const router = express.Router();

// router.get('/:tasksColumnId/tasks', auth, async(req, res) => {
//   const { tasksColumnId } = req.params;

//   const tasks = await Task.find({ tasksColumnId });

//   res.status(200).send(tasks);
// })

// router.post('/task/', auth, async(req, res) => {
//   try {
//     const task = await Task.create(req.body);

//     res.status(200).send(task);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.put('/task/:id', auth, async(req, res) => {
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     res.status(200).send(task);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// })

// router.delete('/task/:id', auth, async(req, res) => {
//   try {
//     await Task.findByIdAndDelete(req.params.id);

//     res.sendStatus(200);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// module.exports = router;
