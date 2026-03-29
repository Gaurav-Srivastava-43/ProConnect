import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/Route.js';
import SocketHandler from './SocketHandler.js';


// CONFIG
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('', authRoutes);

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
const PORT = 6001;

// mongodb://localhost:27017/socialeX

mongoose.connect('mongodb+srv://gauravsrivastava04gs_db_user:9SHqSZiiojVUXRT6@projectcluster0.btt8drd.mongodb.net/?appName=ProjectCluster0'
// , { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
).then(()=>{

        server.listen(PORT, ()=>{
            console.log(`Running @ ${PORT}`);
        });
    }
).catch((e)=> console.log(`Error in db connection ${e}`));
