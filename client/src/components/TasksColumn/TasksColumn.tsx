import React from 'react';
import './tasks-column.scss';

type TasksColumnProps = {
  tasksColumnId: string,
  tasksColumnName: string,
  tasks?: any[],
  deleteTasksColumn(id: string): void,
}

export const TasksColumn: React.FC<TasksColumnProps> = ({
  tasksColumnId,
  tasksColumnName,
  tasks,
  deleteTasksColumn,
}) => {
  const deleteColumn = async () => {
    try {
      await fetch(`/tasks-columns/${tasksColumnId}`, {
        method: 'DELETE',
      });

      deleteTasksColumn(tasksColumnId);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="tasks-column">
      <button className="tasks-column__delete-btn" onClick={deleteColumn}>X</button>
      <h5 className="tasks-column__title">{tasksColumnName}</h5>
      <ul className="tasks-column__tasks">
        tasks
      </ul>
    </section>
  );
};
