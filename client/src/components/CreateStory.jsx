import React, { useContext, useState } from 'react';
import '../styles/CreatePosts.css'
import { GeneralContext } from '../context/GeneralContextProvider';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
// import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import {storage} from '../firebase.js';
// import { v4 as uuidv4 } from 'uuid';

const CreateStory = () => {

    const {socket, isCreateStoryOpen, setIsCreateStoryOpen} = useContext(GeneralContext);
    const [storyType, setStoryType] = useState('photo');
    const [storyDescription, setStoryDescription] = useState('');
    const [storyFile, setStoryFile] = useState(null);
 
    const [uploadProgress, setUploadProgress] = useState();

    //CONDITION FOR 100% COMPLETION OF UPLOAD PROCESS -> CLEAR THE FIELDS
    // if (uploadProgress === 100){
    //     setStoryDescription('');
    //     setStoryFile(null);
    //     setIsCreateStoryOpen(false);
    //     setUploadProgress();
    // }

    //HANDLING THE UPLOAD PROCESS
    const handleStoryUpload = async (e) =>{
        e.preventDefault();

        // Check if file exists
        if (!storyFile) return alert("Please select a file");

        // Create FormData object (required for file uploads)
        const formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('userName', localStorage.getItem('username'));
        formData.append('userPic', localStorage.getItem('profilePic'));
        formData.append('fileType', storyType);
        formData.append('file', storyFile);
        formData.append('text', storyDescription);

        // await socket.emit('create-new-story', {userId: localStorage.getItem('userId'), username: localStorage.getItem('username'), 
        //                                         userPic: localStorage.getItem('profilePic'), fileType: storyType, file: storyFile, 
        //                                         text: storyDescription});
        try {
            setUploadProgress(10); // Start visual progress

            const res = await axios.post('http://localhost:6001/createStory', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
        });

            if (res.status === 201 || res.status === 200) {
                // Reset fields on success
                setStoryDescription('');
                setStoryFile(null);
                setIsCreateStoryOpen(false);
                setUploadProgress(null);
            }
        } catch (err) {
            console.error("Upload failed:", err);
            setUploadProgress(null);
        }
    }

  return (
    <div className="createPostModalBg" style={isCreateStoryOpen? {display: 'contents'} : {display: 'none'}} >
            <div className="createPostContainer">
               
                <RxCross2 className='closeCreatePost' onClick={()=> setIsCreateStoryOpen(false)} />
                <h2 className="createPostTitle">Add new story</h2>
                <hr className="createPostHr" />
                
                <div className="createPostBody">
                    <form>

                    <select className="form-select" aria-label="Select Post Type" onChange={(e)=> setStoryType(e.target.value)}  >
                        <option defaultValue='photo'>Choose post type</option>
                        <option value="photo">Photo</option>
                        <option value="video">Video</option>
                    </select>

                        <div className="uploadBox">
                            <input type="file" name="PostFile" id="uploadPostFile" onChange={(e)=> setStoryFile(e.target.files[0])} />
                        </div>
                        <div className="form-floating mb-3 authFormInputs descriptionInput">
                            <input type="text" className="form-control descriptionInput" id="floatingDescription" placeholder="Description" 
                                                                onChange={(e)=> setStoryDescription(e.target.value)} value={storyDescription}  /> 
                            <label htmlFor="floatingDescription">Text</label>
                        </div>
                        {uploadProgress ?
                            <button disabled>Uploading... {Math.round(uploadProgress)}%</button>
                        :
                        <button onClick={handleStoryUpload}>Upload</button>
                        }
                    </form>
                </div>
            </div>
        </div>
  )
}

export default CreateStory