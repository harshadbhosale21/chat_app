import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import ConnectDB from './db.js';
import authRoute from './Routes/authRoutes.js';
import messageRoute from './Routes/messageRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import { app, server } from './socket/socket.js';
dotenv.config();


// console.log('Mongo_Url:', process.env.Mongo_Url);
// console.log('Port:', process.env.PORT)

ConnectDB();


const __dirname = path.resolve();
// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser())




app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoutes);

// app.use(express.static(path.join(__dirname, '/frontent/build')));
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

const staticPath = path.join(__dirname, 'frontend', 'build');
console.log(`Serving static files from ${staticPath}`);
app.use(express.static(staticPath));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
// });
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'frontend', 'build', 'index.html');
    console.log(`Serving index.html for ${req.url}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.log(`Error sending index.html: ${err}`);
            res.status(500).send(err);
        }
    });
});


const Port = process.env.PORT || 5000;
server.listen(Port, () => {
    console.log(`Server is running at port ${Port}`)
});