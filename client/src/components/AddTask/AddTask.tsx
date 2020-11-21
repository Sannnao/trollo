import React, { useState } from 'react';
import { TaskShape } from '../../interfaces';
import { AddOrEditTask } from '..';

type AddTaskProps = {
  tasksColumnId: string,
  addTaskToColumn(task: TaskShape): void,
  toggleAddTask(): void,
}

export const AddTask: React.FC<AddTaskProps> = ({
  tasksColumnId,
  toggleAddTask,
  addTaskToColumn,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const saveTask = async (taskTitle: string, taskDescr: string) => {
    setIsLoading(true)
    const token = localStorage.getItem(`JWTAuthTraining`);

    if (token) {
      const taskData = await fetch('/task/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({
          tasksColumnId,
          taskTitle,
          taskDescr,
        })
      });

      const task = await taskData.json();

      setIsLoading(false);
      addTaskToColumn(task);
    }
  }

  return (
    isLoading
      ? <div>Loading</div>
      : <AddOrEditTask
        handleSaveTask={saveTask}
        cancelHandleTask={toggleAddTask}
      />
  )
}
