import React, { useState ,useRef} from 'react';
import Header from '../components/Header';
import RecieveAudio from '../components/RecieveAudio';
import FreeScribe from '../components/FreeScribe';
import PlayAudio from '../components/PlayAudio';
import ReadAudio from '../components/ReadAudio';

const HomePage = () => {
    const [audioFile,setAudioFile] = useState(null);
    const [audioURL,setAudioURL] = useState(null);
    const [isCorrectAudio,setIsCorrectAudio] = useState(false);

    const clearAudio = ()=>{
        setAudioFile(null);
        setAudioURL(null);
    }

  return (
    <div className='p-4 md:p-16'>
      <Header/>
      <FreeScribe/>
      {(!audioURL || !isCorrectAudio) ? 
      <div className={`${audioURL ? 'pointer-events-none opacity-50':''}`}>
        <RecieveAudio setAudioFile={setAudioFile} setAudioURL={setAudioURL}/>
    </div>:
      <ReadAudio audioURL={audioURL}/>
      }
      {audioURL && !isCorrectAudio && <PlayAudio setIsCorrectAudio={setIsCorrectAudio} audioURL={audioURL} clearAudio={clearAudio}/>}
    </div>
  )
}

export default HomePage
