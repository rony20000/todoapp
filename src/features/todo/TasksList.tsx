import React from 'react'
import Task from './Task'
import { TaskType } from './todoTypes'

export default function TasksList({ tasks }: { tasks: TaskType[] }) {
  const tasksList = tasks.map((task) => <Task key={task.id} task={task} />)
  return <tbody>{tasksList}</tbody>
}
