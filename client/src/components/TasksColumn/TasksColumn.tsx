import React, { useState, useEffect } from 'react';
import './tasks-column.scss';

import { TaskShape } from '../../interfaces';

import { TaskHandler, AddTask } from '..';
import { useNotify } from 'context/NotificationContext';

type TasksColumnProps = {
  tasksColumnId: string;
  tasksColumnName: string;
  tasks?: any[];
  deleteTasksColumn(id: string): void;
};

export const TasksColumn: React.FC<TasksColumnProps> = ({
  tasksColumnId,
  tasksColumnName,
  tasks,
  deleteTasksColumn,
}) => {
  const [isAddTask, setIsAddTask] = useState(false);
  const [columnTasks, setColumnTasks] = useState<TaskShape[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { notify } = useNotify();

  useEffect(() => {
    const getColumnTasks = async () => {
      const token = localStorage.getItem(`JWTAuthTraining`);
      if (token) {
        try {
          const res = await fetch(`/${tasksColumnId}/tasks`, {
            headers: {
              'Content-type': 'application/json,charset=utf-8;',
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });

          if (res.ok) {
            const columnTasks = await res.json();

            setColumnTasks(columnTasks);
            setIsLoading(false);
          } else {
            notify({ type: 'error', message: res.statusText });
          }
        } catch (err) {
          console.log(err);
          notify({ type: 'error', message: err as string });
        }
      }
    };

    getColumnTasks();
  }, []);

  const deleteColumn = async () => {
    const token = localStorage.getItem(`JWTAuthTraining`);

    try {
      if (token) {
        await fetch(`/tasks-columns/${tasksColumnId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
      }

      deleteTasksColumn(tasksColumnId);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleAddTask = () => setIsAddTask((isAddTask) => !isAddTask);

  const addTaskToColumn = (task: TaskShape): void => {
    setColumnTasks((columnTasks) => {
      const updatedColumnTasks = columnTasks.map((task) => ({ ...task }));
      updatedColumnTasks.push(task);
      return updatedColumnTasks;
    });
  };

  const editTask = (task: TaskShape) => {
    setColumnTasks((columnTasks) =>
      columnTasks.map((oldTask) => {
        if (oldTask._id === task._id) {
          return task;
        }

        return oldTask;
      })
    );
  };

  const deleteTaskFromColumn = (taskId: string) => {
    setColumnTasks((columnTasks) =>
      columnTasks.filter(({ _id }) => taskId !== _id)
    );
  };

  return (
    <section className="tasks-column">
      <button className="tasks-column__delete-btn" onClick={deleteColumn}>
        X
      </button>
      <h5 className="tasks-column__title">{tasksColumnName}</h5>
      <ul className="tasks-column__tasks">
        {columnTasks.map(({ _id: taskId, taskTitle, taskDescr }) => (
          <TaskHandler
            key={taskId}
            editTask={editTask}
            taskId={taskId}
            taskTitle={taskTitle}
            taskDescr={taskDescr}
            deleteTaskFromColumn={deleteTaskFromColumn}
          />
        ))}
      </ul>
      {isLoading && <div>Loading....</div>}
      {isAddTask ? (
        <AddTask
          tasksColumnId={tasksColumnId}
          addTaskToColumn={addTaskToColumn}
          toggleAddTask={toggleAddTask}
        />
      ) : (
        <button onClick={toggleAddTask}>Add new task</button>
      )}
    </section>
  );
};
