import React,{useRef,useState} from 'react'

const PlayAudio = (props) => {
    const {setIsCorrectAudio,audioURL} = props;
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
  
    const togglePlayPause = () => {
        console.log("THIS IS CALLED")
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };
  
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
  
    return (
        <>
      <div className="flex justify-center flex-col mt-16">
        <audio
          ref={audioRef}
          src={audioURL}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
        />
        </div>
        <div className='flex justify-center'>
        <i className={`text-[6.5rem] md:text-[8.5rem] fa-solid fa-headphones ${isPlaying ? "animate":""}`}></i>  
        </div>
        <div className='flex justify-center mt-4 md:mt-8 gap-6 md:gap-16'>
            <button onClick={()=>{window.location.href="/audio-translation"}} className='bg-white text-black pl-4 pr-4 pt-1 pb-1 shadow-sm rounded-xl'>Reject</button>
            <button onClick={togglePlayPause} className='bg-red-400 pl-4 pr-4 rounded-2xl text-white'> 
            {isPlaying ? 
            <i className="fa-solid fa-pause"></i>:
            <i className="fa-solid fa-play"></i>
            }
            </button>
            <button onClick={()=>{setIsCorrectAudio(true)}} className='bg-blue-500 text-text pl-4 pr-4 pt-1 pb-1 shadow-sm rounded-xl'> Accept</button>
        </div>
      </>
    );
}

export default PlayAudio;
