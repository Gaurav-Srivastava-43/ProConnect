import Post from '../models/Post.js';
import Stories from '../models/Stories.js';
import User from '../models/Users.js'

//FUNCTION TO FETCH ALL POSTS
export const fetchAllPosts = async (req, res) =>{
    try {
        const posts = await Post.find().sort({ _id: -1 });
        res.json(posts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
} 

//FUNCTION TO FETCH USERNAME
export const fetchUserName = async (req, res) =>{
  try {
      const userId = req.body.userId;
      const user = await User.findOne({_id: userId});
      console.log(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    } 
} 

//FUNCTION TO FETCH USER PROFILE PIC
export const fetchUserImg = async (req, res) =>{
  try {
    const userId = req.body.userId;
    const user = await User.findOne({_id: userId});
    console.log(userId);
    res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
} 

//FUNCTION TO FETCH ALL STORIES
export const fetchAllStories = async (req, res) =>{
  try {
    const stories =  await Stories.find();
    res.status(200).json(stories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
} 