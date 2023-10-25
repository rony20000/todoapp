import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk, RootState } from '../../app/store'
import {
  TASKS_TO_SHOW,
  TaskType,
  TodoState,
  TODO_APP_STATUS,
} from './todoTypes'
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080'

const initialState: TodoState = {
  tasks: null,
  status: TODO_APP_STATUS.IDLE,
  tasksToShow: TASKS_TO_SHOW.ALL,
}

export const createTaskAsync = createAsyncThunk<TaskType, string>(
  'todo/createTask',
  async (text: string) => {
    const response = await axios.post(`${SERVER_URL}/tasks/`, { text })
    return response.data
  }
)

export const fetchTasksAsync = createAsyncThunk('todo/fetchTasks', async () => {
  const response = await axios.get(`${SERVER_URL}/tasks`)
  return response.data
})

export const getCompletedTasksAsync = createAsyncThunk(
  'todo/fetchCompletedTasks',
  async () => {
    const response = await axios.get(`${SERVER_URL}/tasks/completed`)
    return response.data
  }
)

export const deleteTaskAsync = createAsyncThunk<string, string>(
  'todo/deleteTask',
  async (id: string) => {
    await axios.delete(`${SERVER_URL}/tasks/${id}`)
    return id
  }
)

export const updateTaskAsync = createAsyncThunk(
  'todo/updateTask',
  async ({ id, text }: { id: string; text: string }) => {
    const response = await axios.post(`${SERVER_URL}/tasks/${id}`, { text })
    return response.data
  }
)

export const incompleteTaskAsync = createAsyncThunk(
  'todo/incompleteTask',
  async (id: string) => {
    const response = await axios.post(`${SERVER_URL}/tasks/${id}/incomplete`)
    return response.data
  }
)

export const completeTaskAsync = createAsyncThunk(
  'todo/completeTask',
  async (id: string) => {
    const response = await axios.post(`${SERVER_URL}/tasks/${id}/complete`)
    return response.data
  }
)

export const completeAllTasksAsync = (): AppThunk => (dispatch, getState) => {
  const uncompletedTasks = selectUnCompletedTasks(getState())
  uncompletedTasks?.forEach((task) => {
    dispatch(completeTaskAsync(task.id))
  })
}

export const deleteCompletedTasksAsync =
  (): AppThunk => (dispatch, getState) => {
    const completedTasks = selectCompletedTasks(getState())
    completedTasks?.forEach((task) => {
      dispatch(deleteTaskAsync(task.id))
    })
  }

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTasksToShow: (state, action) => {
      state.tasksToShow = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = TODO_APP_STATUS.LOADING
      })
      .addCase(fetchTasksAsync.rejected, (state) => {
        console.log('NOOOOOOOOOOOOOOOO')

        state.status = TODO_APP_STATUS.FAILED
      })
      .addCase(getCompletedTasksAsync.pending, (state) => {
        state.status = TODO_APP_STATUS.LOADING
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.status = TODO_APP_STATUS.IDLE
        if (state.tasks) state.tasks.push(action.payload)
        else state.tasks = [action.payload]
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = TODO_APP_STATUS.IDLE
        state.tasks = action.payload?.reverse()
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.status = TODO_APP_STATUS.IDLE
        const task = state.tasks?.find((v) => v.id === action.payload.id)
        if (task) task.text = action.payload.text
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = TODO_APP_STATUS.IDLE
        if (!state.tasks) return
        state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      })
      .addCase(incompleteTaskAsync.fulfilled, (state, action) => {
        state.status = TODO_APP_STATUS.IDLE
        if (!state.tasks) return
        const index = state.tasks?.findIndex((v) => v.id === action.payload.id)
        state.tasks[index] = action.payload
      })
      .addCase(completeTaskAsync.fulfilled, (state, action) => {
        state.status = TODO_APP_STATUS.IDLE
        if (!state.tasks) return
        const index = state.tasks?.findIndex((v) => v.id === action.payload.id)
        state.tasks[index] = action.payload
      })
  },
})

export const { setTasksToShow } = todoSlice.actions

export const selectStatus = (state: RootState): TODO_APP_STATUS =>
  state.todo.status

export const selectTasksToShow = (state: RootState): TASKS_TO_SHOW =>
  state.todo.tasksToShow

export const selectAllTasks = (state: RootState): TaskType[] | null =>
  state.todo.tasks

export const selectCompletedTasks = (state: RootState): TaskType[] | null => {
  if (!state.todo.tasks) return null
  return state.todo.tasks?.filter((task) => task.completed)
}

export const selectUnCompletedTasks = (state: RootState): TaskType[] | null => {
  if (!state.todo.tasks) return null
  return state.todo.tasks?.filter((task) => !task.completed)
}

export default todoSlice.reducer
