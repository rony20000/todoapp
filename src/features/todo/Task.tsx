import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import timeSince from '../../util/timeSince'
import TextInputWithIcon from './TextInputWithIcon'
import {
  completeTaskAsync,
  deleteTaskAsync,
  incompleteTaskAsync,
} from './todoSlice'
import { TaskType } from './todoTypes'

interface TaskProps {
  task: TaskType
}

export default function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch()

  const handelDeleteTask = () => dispatch(deleteTaskAsync(task.id))

  const handelActionOnClick = () => {
    if (task.completed) return dispatch(incompleteTaskAsync(task.id))
    return dispatch(completeTaskAsync(task.id))
  }

  const CompletedStatus = () => (
    <div className="flex items-center">
      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
      <div className="hidden sm:block">{timeSince(task.completedDate)}</div>
    </div>
  )

  const UncompletedStatus = () => (
    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
  )

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td>
        <TextInputWithIcon taskId={task.id} value={task.text} />
      </td>
      <td className="px-2 sm:px-6 py-4 text-xs sm:text-sm hidden sm:table-cell">
        {timeSince(task.createdDate)}
      </td>
      <td className="px-2 sm:px-6 sm:py-4">
        <div className="flex text-xs sm:text-sm items-center">
          {task.completed ? <CompletedStatus /> : <UncompletedStatus />}
        </div>
      </td>
      <td className="px-2 sm:px-6 py-4">
        <button
          onClick={handelActionOnClick}
          className="text-xs sm:text-sm font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
        >
          {task.completed ? 'Incomplete' : 'complete'}
        </button>
      </td>

      <td className="px-2 sm:px-6 sm:py-4">
        <button
          onClick={handelDeleteTask}
          type="button"
          className="text-red-700 text-xs sm:text-sm font-medium dark:text-blue-500 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}
