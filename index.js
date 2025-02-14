import { FileStore } from '@tus/file-store';
import { Server } from '@tus/server';
import express from 'express';
import path from 'path';
import { generateUploadURL } from './s3.js';

const host = '0.0.0.0';
const port = 1080;
const app = express();
const uploadApp = express();

const server = new Server({
    path: '/uploads',  // The path for tus uploads
    datastore: new FileStore({ directory: './files' }),  // FileStore location
});

uploadApp.all('*', server.handle.bind(server));  // Handle all requests with tus server

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    next();
});

app.use('/uploads', uploadApp);  // Forward all requests from /uploads to tus upload app

app.get('/test', (req, res) => {
    res.status(200).send("WORKING");  // Correct response method in Express
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Make sure the file path is correct
});
app.get('/s3', async (req, res) => {
    const url = await generateUploadURL()
    res.send({ url })
});


app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});

