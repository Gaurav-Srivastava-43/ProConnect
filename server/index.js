import { upload } from './controllers/upload.js';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

import authRoutes from './routes/Route.js';
import SocketHandler from './SocketHandler.js';

// CONFIG
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('', authRoutes);

// Upload a single file
// app.post("/createPost", upload().single("file"), async (req, res) => {
//   try {
//     res.status(201).json({ text: "File uploaded successfully !" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       error: { text: "Unable to upload the file", error },
//     });
//   }
// });

//CREATING SERVER
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});
io.on("connection", (socket) =>{
    console.log("User connected");
    SocketHandler(socket);
})

//MONGOOSE SETUP
const PORT = process.env.PORT || 6001;

mongoose.connect('mongodb+srv://gauravsrivastava04gs_db_user:9SHqSZiiojVUXRT6@projectcluster0.btt8drd.mongodb.net/?appName=ProjectCluster0'
// , { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
).then(()=>{
        server.listen(PORT, ()=>{
            console.log("Database Connected");
            console.log(`Running @ ${PORT}`);
        });
    }
).catch((e)=> console.log(`Error in db connection ${e}`));

//MONGODB GRIDFS BUCKET CREATION FOR STORING FILES
let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "filesBucket",
    });
    console.log("File Bucket created");
    const res = async()=>{ 
        await bucket.find({}).toArray()
    };
    res().then((val)=>{
      console.log(val);
    }).catch((err)=>{console.log(err);});
  });
})();

export const getBucket = () => bucket;
