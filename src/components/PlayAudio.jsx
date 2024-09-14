import React,{useRef,useState,useEffect} from 'react'
import WavesurferPlayer from '@wavesurfer/react'

const PlayAudio = (props) => {
    const {setIsCorrectAudio,audioURL} = props;
    const [wavesurfer, setWavesurfer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

  const onReady = (ws) => {
    setWavesurfer(ws)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }
  
    return (
        <>
       <div className='mt-4 ml-8 mr-8 sm:ml-[100px] sm:mr-[100px]'>
       <WavesurferPlayer
        height={100}
        waveColor="#60a5fa"
        url={audioURL}
        onReady={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
       </div>

        <div className='flex justify-center mt-4'>
            <button onClick={()=>{window.location.href="/audio-translation"}} className='flex gap-1 text-md items-center justify-center bg-white sm:w-[20%] md:w-[20%] w-[40%] text-black pl-4 pr-4 pt-1 pb-1 shadow-sm rounded-l-xl text-slate-400 hover:bg-red-300 hover:text-white'><i className="fa-solid fa-rotate-right"></i>Retry</button>
            <button onClick={togglePlayPause} className='bg-blue-400 pl-4 pr-4 text-white'> 
            {isPlaying ? 
            <i className="fa-solid fa-pause"></i>:
            <i className="fa-solid fa-play"></i>
            }
            </button>
            <button onClick={()=>{setIsCorrectAudio(true)}} className='flex gap-1 items-center text-md justify-center bg-white sm:w-[20%] md:w-[20%] w-[40%] text-text pl-4 pr-4 pt-1 pb-1 shadow-sm rounded-r-xl text-blue-400 hover:bg-green-300 hover:text-white'><i class="fa-solid fa-pen-nib"></i>Transcribe</button>
        </div>
      </>
    );
}

export default PlayAudio;
