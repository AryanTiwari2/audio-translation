import React, { useEffect, useState } from 'react'
import { uploadAudio, requestTranscription, pollForTranscription, fetchBlobFromURL } from '../APIcalls';
import Translation from './Translation';
import Transcription from './Transcription';
const val = [1, 2, 3, 2, 1]
const ReadAudio = ({ audioURL }) => {


  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('transcription');
  const [text, setText] = useState(null);
  const [original, setOrginal] = useState(null)
  const [statusTranslation, setStatusTranslation] = useState('choose');
  const [translatedText, setTranslatedText] = useState("");

  const processAudio = async (audioBlob) => {
    try {
      //convert to blob
      const audio = await fetchBlobFromURL(audioBlob);

      // Upload the audio
      const uploadUrl = await uploadAudio(audio);

      // Request transcription id
      const transcription = await requestTranscription(uploadUrl);
      const id = transcription.id;

      //get text from id
      const response = await pollForTranscription(id);
      setText(response);
      setOrginal(response);

      setLoading(false);
    } catch (error) {
      console.error('Error processing audio:', error);
      setLoading(false)
    }
  };

  useEffect(() => {
    processAudio(audioURL);
  }, [])
  return (
    <>
      {loading ? <div className='flex flex-col justify-center items-center'>
        <h1 className='flex justify-center sm:text-[30px] text-[20px] text-blue-400 mt-10 sm:mt-4'>{status === "transcription" ? "Transcribing..." : "Translating..."}</h1>
        {val.map((data) => {
          return (
            <div className={`rounded-2xl bg-slate-400 sm:h-3 h-2 sm:mt-3 mt-2 w-8 loading${data}`}></div>
          )
        })}
      </div> :
        <div>
          <h1 className='flex justify-center sm:text-[30px] text-[20px] mt-10 sm:mt-4'>Your<span className='text-blue-400 ml-2'>Transcription</span></h1>
          <div className='flex justify-center sm:mt-3 mt-4'>
            <button
              onClick={() => { setStatus('transcription') }}
              className={`lg:w-[15%] sm:w-[25%] w-[43%] text-[20px] shadow-xl rounded-l-2xl ${status == "transcription" ? "bg-blue-400 text-white" : "text-blue-400 bg-white"}`}>
              Transcription
            </button>
            <button
              onClick={() => { setStatus('translation') }}
              className={`lg:w-[15%] sm:w-[25%] w-[43%] text-[20px] rounded-r-2xl shadow-xl ${status == "translation" ? "bg-blue-400 text-white" : "text-blue-400 bg-white"}`}>
              Translation
            </button>
          </div>
          <div>
            {status === "translation" ? <Translation text={text} setLoading={setLoading}
              setStatusTranslation={setStatusTranslation}
              statusTranslation={statusTranslation}
              translatedText={translatedText}
              setTranslatedText={setTranslatedText} /> : 
              <Transcription text={text} setText={setText} original={original} />}
          </div>
        </div>
      }
    </>
  )
}

export default ReadAudio
