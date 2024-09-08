import React, { useState } from 'react'
const val = [1,2,3,2,1]
const ReadAudio = () => {
  const [loading , setLoading] = useState(false);
  const [status,setStatus] = useState('transcription')
  return (
    <>
    {loading ? <div className='flex flex-col justify-center items-center'>
         <h1 className='flex justify-center sm:text-[30px] text-[20px] text-blue-400 mt-10 sm:mt-4'>Transcribing...</h1>
        {val.map((data)=>{
          return (
            <div className={`rounded-2xl bg-slate-400 sm:h-3 h-2 sm:mt-3 mt-2 w-8 loading${data}`}></div>
          )
        })}
    </div>:
    <div>
       <h1 className='flex justify-center sm:text-[30px] text-[20px] mt-10 sm:mt-4'>Your<span className='text-blue-400 ml-2'>Transcription</span></h1>
       <div className='flex justify-center sm:mt-3 mt-4'>
        <button 
        onClick={()=>{setStatus('transcription')}}
        className={`lg:w-[15%] sm:w-[25%] w-[43%] text-[20px] shadow-xl rounded-l-2xl ${status=="transcription" ? "bg-blue-400 text-white":"text-black"}`}>
          Transcription
        </button>
        <button 
        onClick={()=>{setStatus('translation')}}
        className={`lg:w-[15%] sm:w-[25%] w-[43%] text-[20px] rounded-r-2xl shadow-xl ${status=="translation" ? "bg-blue-400 text-white":"text-black"}`}>
          Translation
        </button>
       </div>
    </div>
    }
    </>
  )
}

export default ReadAudio
