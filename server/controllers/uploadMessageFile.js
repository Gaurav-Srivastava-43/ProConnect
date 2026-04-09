//import multer from "multer"
import Media from "../models/Media.js";
import mongoose from "mongoose";

export const uploadMessageFile = async (req,res) => {
    const mediaId = new mongoose.Types.ObjectId();
    const newMedia = new Media({
        _id: mediaId ,
        name: req.file.originalname,
        data: req.file.buffer, // Binary data from Multer
        contentType: req.file.mimetype
    });
    req.body.file = mediaId;
    await newMedia.save();
    // await createPost(req,res);
    res.json({
        id:mediaId
    });
}