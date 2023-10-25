import React, { HTMLProps, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { updateTaskAsync } from './todoSlice'

interface TextInputWithIcon extends HTMLProps<HTMLInputElement> {
  taskId: string
}

export default function TextInputWithIcon({
  taskId,
  ...props
}: TextInputWithIcon) {
  const dispatch = useAppDispatch()
  const [isEnableTextInput, setIsEnableTextInput] = useState(false)
  const [text, setText] = useState(props.value as string)

  const handelOnInputBlur = () => {
    dispatch(updateTaskAsync({ id: taskId, text: text }))
    setIsEnableTextInput(false)
  }

  const handelOnInputChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => setText(e.target.value)

  const handelOnEditIconClick = () => setIsEnableTextInput((prev) => !prev)

  return (
    <div className="relative flex items-center w-40 sm:w-auto sm:flex-grow  px-3 py-2 sm:px-6 sm:py-4 text-gray-900 whitespace-nowrap dark:text-white">
      <div className="absolute inset-y-0 left-4 flex items-center pl-3.5">
        <svg
          onClick={handelOnEditIconClick}
          className="w-4 h-4 align-middle fill-inherit overflow-hidden cursor-pointer"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
          <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
        </svg>
      </div>
      <input
        {...props}
        type="text"
        id="input-group-1"
        disabled={!isEnableTextInput}
        className="disabled:border-none disabled:bg-inherit w-full sm:w-auto sm:flex-grow pl-10 font-normal text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        value={text}
        onChange={handelOnInputChange}
        onBlur={handelOnInputBlur}
      />
    </div>
  )
}
