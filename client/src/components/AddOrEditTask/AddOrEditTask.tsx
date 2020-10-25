import React, { useState } from 'react';

import './add-or-edit-task.scss';

type AddOrEditTaskProps = {
  prevTaskTitle?: string,
  prevTaskDescr?: string,
  handleSaveTask(taskTitle: string, taskDescr: string): void,
  cancelHandleTask(): void,
}

export const AddOrEditTask: React.FC<AddOrEditTaskProps> = ({
  prevTaskTitle = '',
  prevTaskDescr = '',
  handleSaveTask,
  cancelHandleTask,
}) => {
  const [taskTitle, setTaskTitle] = useState(prevTaskTitle);
  const [taskDescr, setTaskDescr] = useState(prevTaskDescr);

  const handleTaskTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  }

  const handleTaskDescr = (e: React.FocusEvent<HTMLInputElement>) => {
    setTaskDescr(e.target.value);
  }

  const saveTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSaveTask(taskTitle, taskDescr);
    cancelHandleTask();
    setTaskTitle('');
    setTaskDescr('');
  };

  return (
    <form
      className='add-or-edit-task'
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
      <div className='add-or-edit-task__control-panel'>
        <button type='submit'>Save</button>
        <button onClick={cancelHandleTask}>Cancel</button>
      </div>
    </form>
  )
};
