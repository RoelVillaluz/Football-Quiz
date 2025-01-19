import express from 'express';
import { createPlayer, deletePlayer, getPlayers, updatePlayer } from '../controllers/playerController.js';

const router = express.Router();

router.get('/', getPlayers)
router.post('/', createPlayer);
router.patch('/:id', updatePlayer);
router.delete('/:id', deletePlayer);

export default router