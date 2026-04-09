import React, { useContext, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { GeneralContext } from '../../context/GeneralContextProvider'
import axios from 'axios'
import {v4 as uuid} from 'uuid';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { storage } from '../../firebase';

const Input = () => {

    const {socket, chatData} = useContext(GeneralContext);
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState();
    const userId = localStorage.getItem('userId');

    const handleSend = async () =>{

      if (file){
        try{
          let date = new Date();
          const formData = new FormData();
          formData.append("file",file);
          const res = await axios.post('http://localhost:6001/uploadMessageFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
          });
          const fileId = res.data.id;
          await socket.emit('new-message', {chatId: chatData.chatId ,id: uuid(), 
                                                text: text, file: fileId, 
                                                senderId: userId, date: date});
          if (res.status === 201 || res.status === 200) {
            // Reset fields on success
            setUploadProgress();
            setText('');
            setFile(null);  
            }
        }catch(err){
            console.log(err);
        }
        }
      else{
        let date = new Date() 
        await socket.emit('new-message', {chatId: chatData.chatId ,id: uuid(), 
                                            text: text,file: '', senderId: userId, date: date});
        setText('');
      }
    }

  return (
    <div className='input' >
      <input type="text" placeholder='type something...' onChange={e => setText(e.target.value)} value={text} />
      <div className="send">
        <input type="file" style={{display : 'none'}} id='file' onChange={e=> setFile(e.target.files[0])} />
        <label htmlFor="file" style={{display:'flex'}}>
          <BiImageAdd />
          <p style={{fontSize: '12px'}}>{uploadProgress ? Math.floor(uploadProgress) + '%' : ''}</p>
        </label>
        <button onClick={handleSend} >Send</button>
      </div>
    </div>
  )
}

export default Input