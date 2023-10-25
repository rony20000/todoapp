import React from 'react'

export default function Error() {
  return (
    <div className="border text-center text-red-400 text-2xl p-10 w-3/4 mx-auto rounded-lg shadow flex flex-col gap-5 items-start">
      <div>
        We are sorry fo that please try to run the server then reload the page
        again .
      </div>
      <button
        onClick={() => location.reload()}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Reload
      </button>
    </div>
  )
}
