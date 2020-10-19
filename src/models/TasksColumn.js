const mongoose = require('mongoose');

const tasksColumnSchema = new mongoose.Schema({
  userId: String,
  title: String,
  tasks: Array,
});

tasksColumnSchema.statics.toResponce = ({ _id: id, title, tasks }) => ({
  id,
  title,
  tasks,
});

const TasksColumn = mongoose.model('TasksColumn', tasksColumnSchema);

module.exports = TasksColumn;
