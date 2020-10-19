import React, { useState, useEffect, useRef } from 'react';
import './main-page.scss';

import {
  TasksColumn,
  AddTasksColumn,
} from '../../components';

export const MainPage: React.FC = () => {
  const [tasksColumns, setTasksColumns] = useState<any[]>([]);
  const mainPageRef: any = useRef(null);

  const scrollToRight = () => {
    const mainPage = mainPageRef.current;

    mainPage.scrollLeft = mainPage.scrollWidth;
  }

  useEffect(() => {
    scrollToRight();
  }, [tasksColumns]);

  const addTasksColumn = (column: any) => {
    setTasksColumns(columns => [...columns, column]);
  }

  return (
    <div className='main-page' ref={mainPageRef}>
      <TasksColumn tasksColumnName={'Planned'} />
      <TasksColumn tasksColumnName={'In work'} />
      <TasksColumn tasksColumnName={'Done'} />
      {
        tasksColumns.map(({ id, title: columnName, tasks }) =>
          <TasksColumn key={id} tasksColumnName={columnName} tasks={tasks} />
        )
      }
      <AddTasksColumn addTasksColumn={addTasksColumn} scrollMainPageToRight={scrollToRight} />
    </div>
  )
}
