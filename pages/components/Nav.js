import Link from 'next/link'
import React from 'react'

function Nav({dayTotal}) {
  return (
    <nav className="sticky top-0  bg-gray-200 py-1 border-b border-black">

      <div className="flex  justify-items-center items-center justify-center">
        <span className="px-4 text-xl font-semibold hidden md:block">
          Calorie
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <span className="px-4 text-xl font-semibold hidden md:block">
          Calculator
        </span>
      </div>


      
    <div className='absolute flex justify-between top-1/2 right-0 w-1/3 md:w-1/4 -translate-y-1/2 font-semibold text-lg'>
        <h2>
        Today&apos;s total: {dayTotal}
        </h2>
        <div className='px-7 flex items-center cursor-pointer'>
            <Link href='/signup'><span className='px-4 py-2 font-semibold shadow bg-white focus:shadow-outline hover:bg-green-300 transition-all ease-out text-base'>LOGIN</span></Link>
            
            </div>
    </div>

  </nav>
  )
}

export default Nav