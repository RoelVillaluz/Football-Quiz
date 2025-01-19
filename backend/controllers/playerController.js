import Player from '../models/playerModel.js'

// GET /api/players (retrieve all players)
export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find().populate('clubs', 'name'); // fetch all players
        res.status(200).json({ success: true , data: players })
    } catch (error) {
        console.error('Error fetching players', error)
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// POST /api/players (create a new player)
export const createPlayer = async(req, res) => {
    const player = req.body;

    if (!player.name) {
        return res.status(400).json({ success: false, message: 'Please provide a name' });
    }


    try {
        const existingPlayer = Player.findOne({ name: player.name })

        if (existingPlayer) {
            return res.status(400).json({ success: false, message: 'Player already exists' })
        }

        const newPlayer = new Player(player)
        await newPlayer.save()
        res.status(201).json({ success: true, data: newPlayer })

    } catch (error) {
        console.error('Error in create player', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// PUT /api/players:id (update player)
export const updatePlayer = async(req, res) => {
    const { id } =  req.params;
    const player = req.body;

    try {
        const updatedPlayer = await Player.findByIdAndUpdate(id, player, { new: true });
        res.status(200).json({ success: true, data: updatedPlayer });
    } catch (error) {
        console.log(error);
    }
}

// DELETE /api/players:id (update player)
export const deletePlayer = async(req, res) => {
    const { id } = req.params

    try {
        await Player.findByIdAndDelete(id)
        res.status(200).message({ success: true, message: "Player deleted" })
    } catch (error) {
        console.error(error)
    }
} 