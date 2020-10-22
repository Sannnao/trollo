import React, { useState, useEffect } from 'react';

type AddOrEditTaskProps = {
  taskId: string,
  taskTitle: string,
  taskDescr: string,
  cancelAddOrEditTask(): void,
  addTaskToColumn(task: {
    taskId: string,
    taskTitle: string,
    taskDescr: string,
  }): void,
}

export const AddOrEditTask: React.FC<AddOrEditTaskProps> = ({
  addTaskToColumn,
  taskId,
  taskTitle: prevTaskTitle,
  taskDescr: prevTaskDescr,
  cancelAddOrEditTask,
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
    <form onSubmit={saveTask}>
      <input value={taskTitle} onChange={handleTaskTitle} />
      <input value={taskDescr} onChange={handleTaskDescr} />
      <div>
        <button type='submit'>Save</button>
        <button onClick={cancelAddOrEditTask}>Cancel</button>
      </div>
    </form>
  )
}
