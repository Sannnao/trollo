import React, { useState } from 'react';
import './tasks-column.scss';

import { TaskShape } from '../../interfaces';

import {
  TaskHandler,
  AddTask,
} from '..';

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
  const [isAddTask, setIsAddTask] = useState(false);
  const [columnTasks, setColumnTasks] = useState<TaskShape[]>([]);

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

  const addTaskToColumn = (task: TaskShape): void => {
    setColumnTasks(columnTasks => {
      const updatedColumnTasks = columnTasks.map(task => ({ ...task }));
      updatedColumnTasks.push(task);
      return updatedColumnTasks;
    });
  }

  const toggleAddTask = () => setIsAddTask(isAddTask => !isAddTask);

  return (
    <section className="tasks-column">
      <button className="tasks-column__delete-btn" onClick={deleteColumn}>X</button>
      <h5 className="tasks-column__title">{tasksColumnName}</h5>
      <ul className="tasks-column__tasks">
        {columnTasks.map(({
          taskId,
          taskTitle,
          taskDescr,
        }) => <TaskHandler
            addTaskToColumn={addTaskToColumn}
            taskId={taskId}
            taskTitle={taskTitle}
            taskDescr={taskDescr}
          />
        )}
      </ul>
      {
        isAddTask
          ? <AddTask
              addTaskToColumn={addTaskToColumn}
              cancelAddOrEditTask={toggleAddTask}
          />
          : <button onClick={toggleAddTask}>Add new task</button>
      }
    </section>
  );
};
