import React from 'react';
import { AddOrEditTask } from '..';
import { TaskShape } from '../../interfaces';

type EditTaskProps = {
  taskId: string,
  taskTitle: string,
  taskDescr: string,
  toggleEditTask(): void,
  editTask(task: TaskShape): void,
}

export const EditTask: React.FC<EditTaskProps> = ({
  taskId,
  taskTitle,
  taskDescr,
  toggleEditTask,
  editTask,
}) => {
  const saveTask = async (taskTitle: string, taskDescr: string) => {
    const token = localStorage.getItem(`JWTAuthTraining`);

    if (token) {
      const taskData = await fetch(`/task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({
          taskTitle,
          taskDescr,
        })
      });

      const task = await taskData.json();
      console.log(task, taskId);

      editTask(task);
    }
  }

  return (
    <AddOrEditTask
      prevTaskTitle={taskTitle}
      prevTaskDescr={taskDescr}
      handleSaveTask={saveTask}
      cancelHandleTask={toggleEditTask}
    />
  );
}
