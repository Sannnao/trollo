import React, { useState } from 'react';
import { TaskShape } from '../../interfaces';

import './add-task.scss';

type AddTaskProps = {
  addTaskToColumn(task: TaskShape): void,
  cancelAddOrEditTask(): void,
}

export const AddTask: React.FC<AddTaskProps> = ({
  cancelAddOrEditTask,
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

  const saveTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // fetch()
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
        <button onClick={cancelAddOrEditTask}>Cancel</button>
      </div>
    </form>
  )
}
