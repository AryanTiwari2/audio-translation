import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between itemx-center'>
      <div>
        <h1 onClick={()=>{window.location.href="/audio-translation"}} className='text-2xl md:text-4xl cursor-pointer'>Free<span className='text-blue-400'>Scribe</span></h1>
      </div>
      <div>
        <button className='text-xl md:text-2xl flex justify-between gap-2 pl-3 pr-3 pt-1 pb-1 bg-white rounded-2xl items-center shadow-sm'>
            <h2>New</h2>
            <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  )
}

export default Header
