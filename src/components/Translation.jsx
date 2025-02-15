import React, { useState, useRef, useEffect } from 'react'
import { translateText } from '../APIcalls'
import { languages } from '../constant';
import { showAlert } from '../util';
import { languageCode } from '../constant';

const Translation = ({ text, setLoading, statusTranslation, setStatusTranslation, translatedText, setTranslatedText }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const textAreaRef = useRef(null);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(translatedText).then(
      () => {
        showAlert({
          type: "success",
          message: "Copied to Clipboard!!"
        })
      },
      (err) => {
        showAlert({
          type: "error",
          message: "Copying failed!!!!!"
        })
      }
    );
  };

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [translatedText]);

  const helpTranslate = async () => {
    try {
      if (selectedOption === "") {
        showAlert({
          type: "warning",
          message: "Please choose a language!!!!!"
        })
      } else {
        setLoading(true)
        const targetLanguage = languageCode[selectedOption];
        const response = await translateText({ text, targetLanguage });
        console.log(response)
        setTranslatedText(response);
        setLoading(false);
        setStatusTranslation("translated");
      }
    } catch (err) {
      showAlert({
        type: "error",
        message: "Translation Failed!!!!!"
      })
      setLoading(false);
      setStatusTranslation("choose");
      console.log(err);
    }
  }

  return (
    <div>
      {statusTranslation === "choose" && <div>
        <div className='flex justify-center'>
          <select value={selectedOption} onChange={handleChange} className='w-[50%] p-2 mt-8 shadow-xl rounded-md text-blue-400 bg-white '>
            <option value="" disabled className='bg-slate-200'>Select a language</option>
            {languages.map((option, index) => (
              <option key={index} value={option} className='bg-white text-blue-500'>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className='flex justify-center'>
          <button className='w-[25%] p-2 rounded-md text-white bg-blue-400 mt-8' onClick={helpTranslate}>Translate</button>
        </div>
        <h3 className='flex justify-center text-slate-500 italic text-lg mt-8'>
          Choose a language to translate.
        </h3>
      </div>}
      {
        statusTranslation === "translated" && <div>
          <div className='flex justify-center'>
            <textarea className={`mt-8 flex sm:text-2xl text-xl bg-blue-100 border-none text-center sm:w-[50%] w-[75%]`}
              ref={textAreaRef}
              style={{
                border: 'none',
                outline: 'none',
                resize: "none"
              }}
              value={translatedText}
              disabled={true}
            />
          </div>
          <div className='flex justify-center gap-4 mt-[100px]'>
            <button className='text-blue-400 bg-white pt-2 pb-2 pl-4 pr-4 rounded-md'
              onClick={copyTextToClipboard}
            ><i class="fa-solid fa-copy"></i></button>

            <button className='text-blue-400 bg-white pt-2 pb-2 pl-4 pr-4 rounded-md'
              onClick={() => { setStatusTranslation("choose") }}
            ><i class="fa-solid fa-rotate-left"></i></button>
          </div>
          <h3 className='flex justify-center text-sm text-slate-500 italic text-lg mt-8'>
            <a href='https://www.youtube.com/'>Special thanks to tester Ronja👌</a>
          </h3>
        </div>
      }
    </div>
  )
}

export default Translation
