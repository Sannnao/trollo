import React from 'react';
import './task.scss';

export type TaskProps = {
  taskId: string,
  taskTitle: string,
  taskDescr: string,
  editTask(taskId: string): void,
  deleteTaskFromColumn(taskId: string): void,
}

export const Task: React.FC<TaskProps> = ({
  taskId,
  taskTitle,
  taskDescr,
  editTask,
  deleteTaskFromColumn,
}) => {

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem(`JWTAuthTraining`);

      if (token) {
        await fetch(`/task/${taskId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          }
        });

        deleteTaskFromColumn(taskId);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li className='task'>
      <h5 className='task__title'>{taskTitle}</h5>
      <p className='task__descr'>{taskDescr}</p>
      <div>
        <button onClick={() => editTask(taskId)}>Edit</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </li>
  )
}
