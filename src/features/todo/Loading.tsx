import React from 'react'

function LoadingRow() {
  return (
    <tr role="status" className="animate-pulse">
      <th
        scope="row"
        className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4"
      ></th>
      <td className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2.5"></td>
      <td className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2.5"></td>
      <td className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2.5"></td>
      <td className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2.5 hidden sm:table-cell"></td>
    </tr>
  )
}

export default function Loading({ numberOfRows }: { numberOfRows: number }) {
  const rows = []
  for (let i = 0; i < numberOfRows; i++) rows.push(<LoadingRow key={i} />)
  return <tbody>{rows}</tbody>
}
