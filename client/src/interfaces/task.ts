export interface TaskShape {
  _id: string,
  taskTitle: string,
  taskDescr: string,
}

export interface TaskColumnShape {
  _id: string,
  title: string,
  tasks: TaskShape[],
}
