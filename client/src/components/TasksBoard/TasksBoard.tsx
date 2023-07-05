import React, { useState, useEffect, useRef, useContext } from 'react';
import { TaskColumnShape } from '../../interfaces';
import { AuthContext } from '../../context/AuthContext';
import { TasksColumn, AddTasksColumn } from '..';
import './tasks-board.scss';
import { useNotify } from 'context/NotificationContext';

export const TasksBoard = () => {
  const [tasksColumns, setTasksColumns] = useState<TaskColumnShape[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authUserId } = useContext(AuthContext);
  const tasksBoardRef: any = useRef(null);
  const { notify } = useNotify();

  const scrollToRight = () => {
    const tasksBoard = tasksBoardRef.current;

    tasksBoard.scrollLeft = tasksBoard.scrollWidth;
  };

  useEffect(() => {
    setIsLoading(true);

    const getTasksColumns = async () => {
      const token = localStorage.getItem(`JWTAuthTraining`);
      try {
        if (token) {
          const res = await fetch(`/${authUserId}/tasks-columns`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });

          if (res.ok) {
            const columnTasks = await res.json();

            setTasksColumns(columnTasks);
            setIsLoading(false);
          } else {
            notify({ type: 'error', message: res.statusText });
          }
          setIsLoading(false);
          setTasksColumns(tasksColumns);
        }
      } catch (err) {
        console.log(err);
        notify({ type: 'error', message: err as string });
      }
    };

    getTasksColumns();
  }, []);

  const addTasksColumn = (column: any) => {
    setTasksColumns((columns: any) => [...columns, column]);
    scrollToRight();
  };

  const deleteTasksColumn = (id: string): void => {
    const updatedTasksColumns = tasksColumns.filter(({ _id }) => id !== _id);
    setTasksColumns(updatedTasksColumns);
  };

  return (
    <div className="tasks-board" ref={tasksBoardRef}>
      {!isLoading ? (
        tasksColumns.map(({ _id: id, title: columnName, tasks }) => (
          <TasksColumn
            key={id}
            tasksColumnId={id}
            tasksColumnName={columnName}
            tasks={tasks}
            deleteTasksColumn={deleteTasksColumn}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
      <AddTasksColumn
        addTasksColumn={addTasksColumn}
        scrollMainPageToRight={scrollToRight}
      />
    </div>
  );
};
