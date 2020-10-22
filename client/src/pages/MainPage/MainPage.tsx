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
        const tasksColumnsData = await fetch(`/${authUserId}/tasks-columns`);
        const tasksColumns = await tasksColumnsData.json();
        console.log(tasksColumns, authUserId);
        setTasksColumns(tasksColumns);
      }

      getTasksColumns();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    scrollToRight();
  }, [tasksColumns]);

  const addTasksColumn = (column: any) => {
    console.log(column);
    setTasksColumns(columns => [...columns, column]);
  }

  const deleteTasksColumn = (id: string): void => {
    const updatedTasksColumns = tasksColumns.filter(({ _id }) => id !== _id);
    console.log(updatedTasksColumns, id);
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
