import express from 'express';
import { login, register } from '../controllers/Auth.js';
import { createPost } from '../controllers/createPost.js';
import { fetchAllPosts, fetchAllStories, fetchUserImg, fetchUserName } from '../controllers/fetchFunctionalities.js';
import { upload } from '../controllers/upload.js';
import { download } from '../controllers/download.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
//router.post('/createPost', createPost);
router.post("/createPost", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File not uploaded" });
    }
    const fileId = req.file.id;
    //console.log(fileId);
    req.body.file = fileId;
    console.log("Body:", req.body);
    console.log("File:", req.file);
    await createPost(req,res);
  } catch (error) {
    console.log(error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
  // console.log("Headers:", req.headers['content-type']); 
  //   //It should look like: multipart/form-data; boundary=----...
  // console.log("Body:", req.body);
  // console.log("File:", req.file);
  
});
router.get('/download/file/:fileId',download);
router.get('/fetchAllPosts', fetchAllPosts);
router.get('/fetchUserName', fetchUserName);
router.get('/fetchUserImg', fetchUserImg);
router.get('/fetchAllStories', fetchAllStories);

export default router;