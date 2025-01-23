import express from 'express';
import { createPlayer, deletePlayer, getPlayers, getPlayer, getRandomPlayer, updatePlayer } from '../controllers/playerController.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'frontend/football-project/public/player_icons/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
})

const upload = multer({ storage: storage });

const router = express.Router();

// router.post('/', upload.single('image'), createClub);
// router.patch('/:id', upload.single('image'),updateClub);

// get routes
router.get('/', getPlayers);
router.get('/random', getRandomPlayer);
router.get('/:id', getPlayer);

// post and patch routes
router.post('/', upload.single('image'), createPlayer);
router.patch('/:id', upload.single('image'), updatePlayer);

// delete route
router.delete('/:id', deletePlayer);

export default router