import React from 'react';
import './tasks-column.scss';

type TasksColumnProps = {
  tasksColumnName: string,
  tasks?: any[],
}

export const TasksColumn: React.FC<TasksColumnProps> = ({ tasksColumnName, tasks }) => {
  return (
    <section className="tasks-column">
      <h5 className="tasks-column__title">{tasksColumnName}</h5>
      <ul className="tasks-column__tasks">
        tasks
      </ul>
    </section>
  );
};
