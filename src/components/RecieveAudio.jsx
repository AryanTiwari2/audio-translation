import React,{useEffect, useRef,useState} from 'react';

const RecieveAudio = (props) => {

  const {setAudioFile,setAudioURL} = props;
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isRecording,setIsRecording]=useState(false);
  const [countSec,setCountSec] = useState(0);

  useEffect(()=>{
    let countingTime;

    if (isRecording) {
      countingTime = setInterval(() => {
        setCountSec(prevCount => prevCount + 1);
      }, 1000);
    } else {
      setCountSec(0);
    }

    return () => clearInterval(countingTime);
  },[isRecording]);


  const handleAudioUpload = (event)=>{
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioURL(url);
    } else {
      console.log('Please select a valid audio file');
    }
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(audioUrl);
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const handleStopRecording = async() => {
    await mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className='w-full h-full'>
    <div className='flex justify-center gap-2 items-center mt-4 font-bold text-xs md:text-sm'>
        <h3>Record</h3>
        <i className="text-blue-400 fa-solid fa-arrow-right"></i>
        <h3>Transcribe</h3>
        <i className="text-blue-400 fa-solid fa-arrow-right"></i>
        <h3>Translate</h3>
        
    </div>
    <div className='flex justify-center mt-4'>
        {isRecording? 
        <button onClick={handleStopRecording} className='text-red-400 flex justify-between items-center gap-16 bg-white pl-4 pr-4 pt-1 pb-1 rounded-2xl shadow-sm'>
        <h2 className='text-md font-bold'>
          Recording....
        </h2>
        <div className='flex justify-center items-center gap-1'>
        <h2 className=''>{countSec}s</h2>
        <i className="fa-solid fa-microphone"></i>
        </div>
    </button>:
        <button onClick={handleStartRecording} className='flex justify-between items-center gap-20 bg-white pl-4 pr-4 pt-1 pb-1 rounded-2xl shadow-sm'>
            <h2 className='text-md font-bold'>
              Record
            </h2>
            <i className="fa-solid fa-microphone"></i>
        </button>}
    </div>
    <div className='flex justify-center mt-4'>
      <h3 className='flex justify-around items-center gap-1'>
        <p>Or</p> 
        <label className='text-blue-400 cursor-pointer'> Upload
        <input type="file" accept="audio/*" className='hidden' onChange={handleAudioUpload}/>
        </label>
        <p> the audio file</p>
        </h3>
    </div>
    <div className='flex justify-center mt-4'>
        <h3 className='text-slate-500 italic text-lg'>
            Free Now Free Forever
        </h3>
    </div>
    </div>
  )
}

export default RecieveAudio
