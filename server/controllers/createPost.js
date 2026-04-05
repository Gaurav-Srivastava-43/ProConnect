import Post from '../models/Post.js';

//FUNCTION TO CREATE A NEW POST
export const createPost = async (req, res) =>{
    try{
        const newPost = new Post(req.body);
        const post = await newPost.save();
        return res.status(201).json(post); 
    } catch (e) {
        console.log("Error in createPost:", e);
        return res.status(500).json({ error: e.message });
    }
}