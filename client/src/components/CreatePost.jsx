import React, { useContext, useState } from 'react'
import '../styles/CreatePosts.css'
import {RxCross2} from 'react-icons/rx' 
import { GeneralContext } from '../context/GeneralContextProvider'
import axios from "axios";
//import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import {storage} from '../firebase.js';
//import { v4 as uuidv4 } from 'uuid';

const CreatePost = () => {

    const {isCreatePostOpen, setIsCreatePostOpen} = useContext(GeneralContext);
    const [postType, setPostType] = useState('photo');
    const [postDescription, setPostDescription] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [postFile, setPostFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState();

    //CONDITION FOR 100% COMPLETION OF UPLOAD PROCESS -> CLEAR THE FIELDS
    // if (uploadProgress === 100){
    //     setPostDescription('');
    //     setPostLocation('');
    //     setPostFile(null);
    //     setIsCreatePostOpen(false);
    //     setUploadProgress();
    // }

    //HANDLING THE UPLOAD PROCESS
    const handlePostUpload = async (e) => {
    e.preventDefault();
    
    // Check if file exists
    if (!postFile) return alert("Please select a file");

    // Create FormData object (required for file uploads)
    const formData = new FormData();
    formData.append('file', postFile);
    formData.append('userId', localStorage.getItem('userId'));
    formData.append('userName', localStorage.getItem('username'));
    formData.append('userPic', localStorage.getItem('profilePic'));
    formData.append('fileType', postType);
    formData.append('description', postDescription);
    formData.append('location', postLocation);

    try {
        setUploadProgress(10); // Start visual progress

        const res = await axios.post('http://localhost:6001/createPost', formData, {
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
            setPostDescription('');
            setPostLocation('');
            setPostFile(null);
            setIsCreatePostOpen(false);
            setUploadProgress(null);
        }
    } catch (err) {
        console.error("Upload failed:", err);
        setUploadProgress(null);
    }
}
  return (
    <>
        <div className="createPostModalBg" style={isCreatePostOpen? {display: 'contents'} : {display: 'none'}} >
            <div className="createPostContainer">
                
                <RxCross2 className='closeCreatePost' onClick={()=> setIsCreatePostOpen(false)} />
                <h2 className="createPostTitle">Create post</h2>
                <hr className="createPostHr" />
                
                <div className="createPostBody">
                    <form>

                    <select className="form-select" aria-label="Select Post Type" onChange={(e)=> setPostType(e.target.value)}  >
                        <option defaultValue='photo'>Choose post type</option>
                        <option value="photo">Photo</option>
                        <option value="video">Video</option>
                    </select>

                        <div className="uploadBox">
                            <input type="file" name="PostFile" id="uploadPostFile" onChange={(e)=> setPostFile(e.target.files[0])} />
                        </div>
                        <div className="form-floating mb-3 authFormInputs descriptionInput">
                            <input type="text" className="form-control descriptionInput" id="floatingDescription" placeholder="Description" 
                                                                    onChange={(e)=> setPostDescription(e.target.value)} value={postDescription}  /> 

                            <label htmlFor="floatingDescription">Description</label>
                        </div>
                        <div className="form-floating mb-3 authFormInputs postLocation">
                            <input type="text" className="form-control  postLocation" id="floatingLocation" placeholder="Location" 
                                                                    onChange={(e)=> setPostLocation(e.target.value)}  value={postLocation}  /> 
                                                                    
                            <label htmlFor="floatingLocation">Location</label>
                        </div>
                        {uploadProgress ?
                            <button disabled>Uploading... {Math.round(uploadProgress)}%</button>
                        :
                        <button onClick={handlePostUpload}>Upload</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default CreatePost