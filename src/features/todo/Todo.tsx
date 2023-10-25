import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Error from './Error'
import { useFetchTasks } from './hooks'
import Loading from './Loading'
import TasksList from './TasksList'
import {
  completeAllTasksAsync,
  createTaskAsync,
  deleteCompletedTasksAsync,
  selectStatus,
  selectTasksToShow,
  setTasksToShow,
} from './todoSlice'
import { TASKS_TO_SHOW, TODO_APP_STATUS } from './todoTypes'

export default function Todo() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const [text, setText] = useState('')
  const tasksToShow = useAppSelector(selectTasksToShow)
  const { tasks, setSearchText, statistics } = useFetchTasks()

  const handelOnSubmit = () => {
    dispatch(createTaskAsync(text))
    setText('')
  }

  const handelShowAllTasks = () => {
    dispatch(setTasksToShow(TASKS_TO_SHOW.ALL))
  }

  const handelShowCompletedTasks = () =>
    dispatch(setTasksToShow(TASKS_TO_SHOW.COMPLETED))

  const handelDeleteCompletedTasks = () => dispatch(deleteCompletedTasksAsync())

  const handelShowInCompletedTasks = () =>
    dispatch(setTasksToShow(TASKS_TO_SHOW.UNCOMPLETED))

  const handelCompletedAllTasks = () => dispatch(completeAllTasksAsync())

  const handelOnSearchInputChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => setSearchText(e.target.value)

  const handelCreateTaskInputChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => setText(e.target.value)

  if (status === TODO_APP_STATUS.FAILED) return <Error />

  return (
    <div className="mx-2 sm:mx-auto mt-5 block max-w-4xl p-2 sm:p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h1 className="text-center text-lg font-medium">Todo App</h1>
      <form className="flex items-center mt-5" onSubmit={handelOnSubmit}>
        <input
          type="text"
          required
          value={text}
          onChange={handelCreateTaskInputChange}
          className="bg-gray-50 flex-grow border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 rounded-r-none focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-r-0"
          placeholder="Enter Task"
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm rounded-l-none px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create Task
        </button>
      </form>

      <div className="relative overflow-x-auto  sm:rounded-lg mt-5">
        <div className="flex items-center justify-between bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={handelOnSearchInputChange}
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center flex-wrap mt-2 mb-5">
          <div
            onClick={handelShowAllTasks}
            className={`text-center text-xs sm:text-sm border px-4 py-1 rounded-full cursor-pointer hover:bg-green-200 
            ${tasksToShow === TASKS_TO_SHOW.ALL ? 'bg-green-200' : ''}`}
          >
            {statistics.allTasks} All
          </div>
          <div
            onClick={handelShowCompletedTasks}
            className={`text-center text-xs sm:text-sm border px-4 py-1 rounded-full cursor-pointer hover:bg-green-200 ${
              tasksToShow === TASKS_TO_SHOW.COMPLETED ? 'bg-green-200' : ''
            }`}
          >
            {statistics.completedTasks} Completed
          </div>
          <div
            onClick={handelShowInCompletedTasks}
            className={`text-center text-xs sm:text-sm border px-4 py-1 rounded-full cursor-pointer hover:bg-green-200
            ${tasksToShow === TASKS_TO_SHOW.UNCOMPLETED ? 'bg-green-200' : ''}`}
          >
            {statistics.uncompletedTasks} UnCompleted
          </div>
          <button
            type="submit"
            onClick={handelCompletedAllTasks}
            className="text-white sm:ml-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-center text-xs sm:text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Complete All Task
          </button>
          <button
            type="submit"
            onClick={handelDeleteCompletedTasks}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-center text-xs sm:text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Delete Completed Tasks
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate border-spacing-x-0.5 border-spacing-y-1">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-2 py-1 sm:px-6 sm:py-3 text-xs sm:text-sm"
              >
                Task
              </th>
              <th
                scope="col"
                className="px-2 py-1 sm:px-6 sm:py-3 text-xs sm:text-sm hidden sm:block"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-2 py-1 sm:px-6 sm:py-3 text-xs sm:text-sm"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-2 py-1 sm:px-6 sm:py-3 text-xs sm:text-sm"
              >
                Action
              </th>
              <th
                scope="col"
                className="px-2 py-1 sm:px-6 sm:py-3 text-xs sm:text-sm"
              >
                Delete
              </th>
            </tr>
          </thead>

          {status === TODO_APP_STATUS.IDLE && tasks ? (
            <TasksList tasks={tasks} />
          ) : (
            <tbody />
          )}

          {status === TODO_APP_STATUS.LOADING ? (
            <Loading numberOfRows={3} />
          ) : (
            <tbody />
          )}
        </table>
      </div>
    </div>
  )
}
