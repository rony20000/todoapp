export type TaskType = {
  id: string
  text: string
  completed: boolean
  createdDate: number
  completedDate: number
}

export enum TODO_APP_STATUS {
  IDLE = 0,
  LOADING = 1,
  FAILED = 2,
}

export enum TASKS_TO_SHOW {
  ALL = 0,
  COMPLETED = 1,
  UNCOMPLETED = 2,
}

export interface TodoState {
  tasks: TaskType[] | null
  status: TODO_APP_STATUS
  tasksToShow: TASKS_TO_SHOW
}

export type TasksStatistics = {
  allTasks: number
  completedTasks: number
  uncompletedTasks: number
}
