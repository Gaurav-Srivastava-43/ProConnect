import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

// Create storage engine
//export function upload() {
const mongodbUrl = 'mongodb+srv://gauravsrivastava04gs_db_user:9SHqSZiiojVUXRT6@projectcluster0.btt8drd.mongodb.net/?appName=ProjectCluster0';
const storage = null;
// new GridFsStorage({
//   url: mongodbUrl,
//   file: (req, file) => {
//     //const fileId = new mongoose.Types.ObjectId();
//     // console.log(fileId);
//     // req.generatedFileId = fileId;
//     return new Promise((resolve, _reject) => {
//       const fileInfo = {
//         //id:fileId,
//         filename: file.originalname,
//         bucketName: "filesBucket",
//       };
//       resolve(fileInfo);
//     });
//   },
// });

export const upload = multer({ storage });
