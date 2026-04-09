import express from 'express';
import multer from 'multer';
import { login, register } from '../controllers/Auth.js';
import { createPost } from '../controllers/createPost.js';
import { fetchAllPosts, fetchAllStories, fetchUserImg, fetchUserName } from '../controllers/fetchFunctionalities.js';
import { uploadMedia } from '../controllers/uploadMedia.js';
import { fetchMedia } from '../controllers/fetchMedia.js';
import { createStory } from '../controllers/createStory.js';
import { uploadMessageFile } from '../controllers/uploadMessageFile.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

//USER LOGIN/REGISTERROUTES
router.post('/register', register);
router.post('/login', login);

//POST & STORY ROUTES
router.post('/createPost',upload.single("file"), uploadMedia,createPost);
router.post('/createStory',upload.single("file"), uploadMedia,createStory);
router.post('/uploadMessageFile',upload.single("file"), uploadMessageFile);
router.get('/fetchMedia/:fileId',fetchMedia);
router.get('/fetchAllPosts', fetchAllPosts);
router.get('/fetchAllStories', fetchAllStories);

//USER FETCHING ROUTES
router.get('/fetchUserName', fetchUserName);
router.get('/fetchUserImg', fetchUserImg);


export default router;