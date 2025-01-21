import express from 'express';
import { createClub, deleteClub, getClubs, getClub, updateClub } from '../controllers/clubControllers.js';

const router = express.Router();

router.get('/', getClubs);
router.get('/:id', getClub);
router.post('/', createClub);
router.patch('/:id', updateClub);
router.delete('/:id', deleteClub);

export default router