import mongoose from "mongoose";

const MediaSchema = mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    name: {
        type:String
    },
    data: {
        type:Buffer // Stores the actual file content
    },        
    contentType: {
        type:String  // Stores the file type (image/png, video/mp4, etc.)
    }
});

const Media = mongoose.model('media', MediaSchema);
export default Media;