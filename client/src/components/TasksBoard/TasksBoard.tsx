import React, { useState, useEffect, useRef, useContext } from 'react'
import { TaskColumnShape } from '../../interfaces';
import { AuthContext } from '../../context/AuthContext';
import {
  TasksColumn,
  AddTasksColumn,
} from '..';
import './tasks-board.scss';

export const TasksBoard = () => {
  const [tasksColumns, setTasksColumns] = useState<TaskColumnShape[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authUserId } = useContext(AuthContext);
  const tasksBoardRef: any = useRef(null);

  const scrollToRight = () => {
    const tasksBoard = tasksBoardRef.current;

    tasksBoard.scrollLeft = tasksBoard.scrollWidth;
  }

  useEffect(() => {
    setIsLoading(true);
    try {
      const getTasksColumns = async () => {
        const token = localStorage.getItem(`JWTAuthTraining`);

        if (token) {
          const tasksColumnsData = await fetch(`/${authUserId}/tasks-columns`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            }
          });
          const tasksColumns = await tasksColumnsData.json();
          setIsLoading(false);
          setTasksColumns(tasksColumns);
        }
      }

      getTasksColumns();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addTasksColumn = (column: any) => {
    setTasksColumns((columns: any) => [...columns, column]);
    scrollToRight();
  }

  const deleteTasksColumn = (id: string): void => {
    const updatedTasksColumns = tasksColumns.filter(({ _id }) => id !== _id);
    setTasksColumns(updatedTasksColumns);
  }

  return (
    <div className='tasks-board' ref={tasksBoardRef}>
      {!isLoading
        ? tasksColumns.map(({ _id: id, title: columnName, tasks }) =>
          <TasksColumn
            key={id}
            tasksColumnId={id}
            tasksColumnName={columnName}
            tasks={tasks}
            deleteTasksColumn={deleteTasksColumn}
          />
        )
        : <div>Loading...</div>
      }
      <AddTasksColumn addTasksColumn={addTasksColumn} scrollMainPageToRight={scrollToRight} />
    </div>
  )
}
