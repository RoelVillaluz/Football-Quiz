import express from 'express';
import { createClub, deleteClub, getClubs, getClub, updateClub } from '../controllers/clubControllers.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'frontend/football-project/public/club_icons/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getClubs);
router.get('/:id', getClub);
router.post('/', upload.single('image'), createClub);
router.patch('/:id', upload.single('image'),updateClub);
router.delete('/:id', deleteClub);

export default router