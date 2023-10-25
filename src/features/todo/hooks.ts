import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchTasksAsync,
  selectAllTasks,
  selectCompletedTasks,
  selectUnCompletedTasks,
  selectTasksToShow,
} from './todoSlice'
import { TasksStatistics, TASKS_TO_SHOW, TaskType } from './todoTypes'

export const useFetchTasks = () => {
  const didMount = useRef<boolean>(false)
  const [tasks, setTasks] = useState<TaskType[] | null>()
  const [searchText, setSearchText] = useState<string>('')
  const [statistics, setStatistics] = useState<TasksStatistics>({
    allTasks: 0,
    completedTasks: 0,
    uncompletedTasks: 0,
  })
  const dispatch = useAppDispatch()
  const tasksToShow = useAppSelector(selectTasksToShow)
  const allTasks = useAppSelector(selectAllTasks)
  const completedTasks = useAppSelector(selectCompletedTasks)
  const uncompletedTasks = useAppSelector(selectUnCompletedTasks)

  const filterTasksByText = (tasks: TaskType[] | null, text: string) =>
    tasks?.filter((task) => task.text.search(text) !== -1)

  useEffect(() => {
    if (didMount.current) dispatch(fetchTasksAsync())
    else didMount.current = true
  }, [])

  useEffect(() => {
    setStatistics({
      allTasks: allTasks?.length || 0,
      completedTasks: completedTasks?.length || 0,
      uncompletedTasks: uncompletedTasks?.length || 0,
    })

    if (tasksToShow === TASKS_TO_SHOW.COMPLETED)
      setTasks(filterTasksByText(completedTasks, searchText))
    else if (tasksToShow === TASKS_TO_SHOW.UNCOMPLETED)
      setTasks(filterTasksByText(uncompletedTasks, searchText))
    else setTasks(filterTasksByText(allTasks, searchText))
  }, [allTasks, tasksToShow, searchText])

  return { tasks, setSearchText, statistics }
}
