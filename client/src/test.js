import axios from "axios";
const uploadFile = () => {
    let form = document.getElementById("file-upload");
    let fileName = document.getElementById("file-name");
    let file = document.getElementById("uploaded-file");
    let formData = new FormData();
    formData.append("fileName",fileName);
    formData.append("file",file);

    try {
        const res = axios.post(`${process.env.REACT_APP_API_BASE_URL}/createPost`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }});
        console.log("Posted successfully");
    } catch (error) {
        console.log("error :",error); 
    }
}
uploadFile();