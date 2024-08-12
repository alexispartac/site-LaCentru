import http from 'http'
import express from 'express';                         
import bodyParser from 'body-parser';             
import preparateRoutes from './routes/preparate.js';
import connectDB from "./config/dbConn.js"
import mongoose from 'mongoose';
// app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/preparate', preparateRoutes);

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Create server 
const server = http.createServer(app);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    // Connect to server
    server.listen( PORT , (err) => {
        if (err) {
            console.log("Not connected to server: ", err);
        }
        console.log(`Server running on port: http://localhost:${PORT}`)
    })
})


