import React from 'react';
import { Task, TaskProps } from '..';

const taskProps: TaskProps = {
  taskId: '1241141312awefawd23awdaw3',
  taskTitle: 'Add redux to the app',
  taskDescr: 'Need to add redux to the app for handy manage all state',
  editTask() {},
  deleteTask() {},
}

export default {
  title: 'Components/Task',
  component: Task
}

export const Default = () => <Task {...taskProps} />;
