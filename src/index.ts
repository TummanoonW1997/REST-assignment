import express from 'express';
import dotenv from 'dotenv';

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({extended: true})); // parses incoming requests with urlencoded payloads
dotenv.config(); //config to read .env file

import {routes} from './routes/r_index';

const PORT = process.env.PORT;
const API = process.env.API as string;


function onStart(){
    console.log(`Server running on port ${PORT} - Project: REST Assignment`);
}

app.listen(PORT, onStart);
app.use(API, routes);

module.exports = app;