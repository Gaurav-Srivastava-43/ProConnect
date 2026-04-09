import Stories from '../models/Stories.js';

//FUNCTION TO CREATE A NEW STORY
export const createStory = async (req, res) =>{
    try{
        console.log("i am in create story controller")
        const newStory = new Stories(req.body);
        const story = await newStory.save();
        return res.status(201).json(story); 
    } catch (e) {
        console.log("Error in createStory:", e);
        return res.status(500).json({ error: e.message });
    }
}