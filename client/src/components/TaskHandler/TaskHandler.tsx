import React, { useState } from 'react';
import { Task, AddOrEditTask } from '..';
import { TaskShape } from '../../interfaces';

type TaskHandlerProps = {
  taskId: string,
  taskTitle: string,
  taskDescr: string,
  addTaskToColumn(task: TaskShape): void,
}

export const TaskHandler: React.FC<TaskHandlerProps> = ({
  addTaskToColumn,
  taskId,
  taskTitle,
  taskDescr,
}) => {
  const [isAddOrEdit, setIsAddOrEdit] = useState(false);

  const toggleAddOrEditTask = () => {
    setIsAddOrEdit(isAddOrEdit => !isAddOrEdit);
  }

  const cancelAddOrEditTask = () => setIsAddOrEdit(false);

  return <Task
      taskId={taskId}
      taskTitle={taskTitle}
      taskDescr={taskDescr}
      editTask={() => {}}
      deleteTask={() => {}}
    />
}
