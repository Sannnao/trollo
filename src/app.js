const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const tasksColumnRouter = require('./routers/tasksColumn');
const taskRouter = require('./routers/task');
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(tasksColumnRouter);
app.use(taskRouter);

const start = async () => {
  try {
    await require('./db/db');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log('Server error', err.message);
  }
};

start();
