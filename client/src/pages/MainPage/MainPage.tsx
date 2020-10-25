import React, { useState, useEffect, useRef, useContext } from 'react';
import './main-page.scss';

import { AuthContext } from '../../context/AuthContext';

import {
  TasksColumn,
  AddTasksColumn,
} from '../../components';

export const MainPage: React.FC = () => {
  const [tasksColumns, setTasksColumns] = useState<any[]>([]);
  const { authUserId } = useContext(AuthContext);
  const mainPageRef: any = useRef(null);

  const scrollToRight = () => {
    const mainPage = mainPageRef.current;

    mainPage.scrollLeft = mainPage.scrollWidth;
  }

  useEffect(() => {
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
          console.log(tasksColumns, authUserId);
          setTasksColumns(tasksColumns);
        }
      }

      getTasksColumns();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addTasksColumn = (column: any) => {
    setTasksColumns(columns => [...columns, column]);
    scrollToRight();
  }

  const deleteTasksColumn = (id: string): void => {
    const updatedTasksColumns = tasksColumns.filter(({ _id }) => id !== _id);
    setTasksColumns(updatedTasksColumns);
  }

  return (
    <div className='main-page' ref={mainPageRef}>
      {
        tasksColumns.map(({ _id: id, title: columnName, tasks }) =>
          <TasksColumn
            key={id}
            tasksColumnId={id}
            tasksColumnName={columnName}
            tasks={tasks}
            deleteTasksColumn={deleteTasksColumn}
          />
        )
      }
      <AddTasksColumn addTasksColumn={addTasksColumn} scrollMainPageToRight={scrollToRight} />
    </div>
  )
}
