import React, { useState,useRef, useEffect } from 'react'
import { showAlert } from '../util';

const Transcription = ({setText,text ,original}) => {

    const [editable, setEditable] = useState(false)
    const textAreaRef = useRef(null);

    const copyTextToClipboard = () => {
        navigator.clipboard.writeText(text).then(
          () => {
            showAlert({
                type:"success",
                message:"Copied to Clipboard!!"
            })
          },
          (err) => {
            console.error('Failed to copy text: ', err);
          }
        );
      };

    const toggleEdit = ()=>{
        setEditable(edit => !edit);
    }

    useEffect(() => {
        if (editable && textAreaRef.current) {
          const length = textAreaRef.current.value.length;
          textAreaRef.current.setSelectionRange(length, length);
          textAreaRef.current.focus();
        }
      }, [editable]);

    const adjustHeight = () => {
        if (textAreaRef.current) {
          textAreaRef.current.style.height = 'auto';
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
      };

    useEffect(()=>{
        adjustHeight();
    },[text]);

    return (
        <div>
            <div className='flex justify-center'>
                <textarea className={`mt-8 flex sm:text-2xl text-xl bg-blue-100 border-none text-center sm:w-[50%] w-[75%]`}
                ref={textAreaRef}
                style={{
                    border: 'none', 
                    outline: 'none',
                    resize:"none"
                  }}
                    value={text}
                    disabled={!editable}
                    onChange={(e) => { setText(e.target.value) }}
                />
            </div>
            <div className='flex justify-center gap-4 mt-[100px]'>
                <button className='text-blue-400 bg-white pt-2 pb-2 pl-4 pr-4 rounded-md'
                onClick={copyTextToClipboard}
                ><i class="fa-solid fa-copy"></i></button>

                <button className='text-blue-400 bg-white pt-2 pb-2 pl-4 pr-4 rounded-md'
                onClick={toggleEdit}
                >{editable?
                    <i class="fa-regular fa-circle-check"></i>:
                    <i class="fa-solid fa-pen-to-square"></i>}</button>

                <button className='text-blue-400 bg-white pt-2 pb-2 pl-4 pr-4 rounded-md'
                onClick={()=>{setText(original)}}
                ><i class="fa-solid fa-arrows-rotate"></i></button>
            </div>
        </div>
    )
}

export default Transcription
