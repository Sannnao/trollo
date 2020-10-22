import React from 'react';
import './task.scss';

export type TaskProps = {
  taskId: string,
  taskTitle: string,
  taskDescr: string,
  editTask(taskId: string): void,
  deleteTask(taskId: string): void,
}

export const Task: React.FC<TaskProps> = ({
  taskId,
  taskTitle,
  taskDescr,
  editTask,
  deleteTask,
}) => {
  return (
    <li className='task'>
      <h5 className='task__title'>{ taskTitle }</h5>
      <p className='task__descr'>{ taskDescr }</p>
      <div>
        <button onClick={() => editTask(taskId)}>Edit</button>
        <button onClick={() => deleteTask(taskId)}>Delete</button>
      </div>
    </li>
  )
}
