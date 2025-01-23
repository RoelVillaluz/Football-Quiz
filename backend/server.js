import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import { connectDB } from "./config/db.js";
import clubRoutes from './routes/clubRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import path from 'path'; 
import { fileURLToPath } from 'url'; 

dotenv.config();

const app = express();

// Get the current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files from the 'club icons' and 'player icons' directory
app.use('/club_icons', express.static(path.join(__dirname, 'frontend', 'football-project' , 'public', 'club_icons')));
app.use('/player_icons', express.static(path.join(__dirname, 'frontend', 'football-project', 'public', 'player_icons')));

app.use(cors()); 
app.use(express.json()); 
app.use('/api/clubs', clubRoutes);
app.use('/api/players', playerRoutes);

app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
});
