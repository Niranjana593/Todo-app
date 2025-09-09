import React from 'react'

const nav = () => {
  return (
    <nav className='flex justify-between  font-semibold bg-slate-600 text-white h-14 items-center'>
        <div className="logo mx-4 text-xl cursor-pointer">Itask Manager</div>
        <ul className='flex gap-14 mx-9'>
            <li className='cursor-pointer text-xl  hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer  text-xl hover:font-bold transition-all'>My todo-list</li>
        </ul>
    </nav>
  )
}

export default nav
