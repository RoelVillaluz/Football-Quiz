import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors middleware
import { connectDB } from "./config/db.js";
import clubRoutes from './routes/clubRoutes.js'
import playerRoutes from './routes/playerRoutes.js'

dotenv.config();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Allows to accept JSON data in req.body
app.use('/api/clubs', clubRoutes)
app.use('/api/players', playerRoutes)


// Start the server
app.listen(5000, () => {
    connectDB(); // Connect to the database
    console.log('Server started at http://localhost:5000');
});