import React, { useState } from 'react';
import { Task, EditTask } from '..';
import { TaskShape } from '../../interfaces';

type TaskHandlerProps = {
  taskId: string,
  taskTitle: string,
  taskDescr: string,
  editTask(task: TaskShape): void,
  deleteTaskFromColumn(taskId: string): void,
}

export const TaskHandler: React.FC<TaskHandlerProps> = ({
  editTask,
  deleteTaskFromColumn,
  taskId,
  taskTitle,
  taskDescr,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEditTask = () => {
    setIsEdit(isAddOrEdit => !isAddOrEdit);
  }

  return isEdit
    ? <EditTask
      taskId={taskId}
      taskTitle={taskTitle}
      taskDescr={taskDescr}
      toggleEditTask={toggleEditTask}
      editTask={editTask}
    />
    : <Task
      taskId={taskId}
      taskTitle={taskTitle}
      taskDescr={taskDescr}
      editTask={toggleEditTask}
      deleteTaskFromColumn={deleteTaskFromColumn}
    />
}
