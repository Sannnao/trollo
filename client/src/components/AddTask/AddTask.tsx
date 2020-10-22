import React, { useState } from 'react';
import { TaskShape } from '../../interfaces';

import './add-task.scss';

type AddTaskProps = {
  tasksColumnId: string,
  addTaskToColumn(task: TaskShape): void,
  toggleAddTask(): void,
}

export const AddTask: React.FC<AddTaskProps> = ({
  tasksColumnId,
  toggleAddTask,
  addTaskToColumn,
}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescr, setTaskDescr] = useState('');

  const handleTaskTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  }

  const handleTaskDescr = (e: React.FocusEvent<HTMLInputElement>) => {
    setTaskDescr(e.target.value);
  }

  const saveTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem(`JWTAuthTraining`);

    if (token) {
      const taskData = await fetch('/task/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({
          tasksColumnId,
          taskTitle,
          taskDescr,
        })
      });

      const task = await taskData.json();
      console.log(task);

      addTaskToColumn(task);
    }
  }

  return (
    <form
      className='add-task'
      onSubmit={saveTask}
    >
      <label>
        Enter task title:
        <input value={taskTitle} onChange={handleTaskTitle} />
      </label>
      <label>
        Enter task description:
        <input value={taskDescr} onChange={handleTaskDescr} />
      </label>
      <div className='add-task__control-panel'>
        <button type='submit'>Save</button>
        <button onClick={toggleAddTask}>Cancel</button>
      </div>
    </form>
  )
}
