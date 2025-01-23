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

// GET /api/players/:id (retrieve one player)
export const getPlayer = async (req, res) => {
    const { id } = req.params

    try {
        const player = await Player.findById(id).populate('clubs', 'name image')
        if (!player) {
            res.status(404).json({ success: false, message: 'Error: player not found' })
        }

        if (player.image) {
            console.log("Original player image:", player.image); // Debugging: Check original image
            player.image = player.image.replace(/\\/g, '/');
            player.image = `/player_icons/${player.image.split('/').pop()}`;
            console.log("Normalized player image:", player.image); // Debugging: Check normalized path
        } else {
            player.image = '/player_icons/default.png';
        }

        res.status(200).json({ success: true, message: 'Player fetched successfully', data: player }) 
    } catch (error) {
        console.error('Error fetching players', error)
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getRandomPlayer = async (req, res) => {
    try {
        const players = await Player.find().populate('clubs', 'name image'); // Include image

        if (players.length > 0) {
            const randomPlayer = players[Math.floor(Math.random() * players.length)];

            // Normalize image paths for all clubs
            randomPlayer.clubs.forEach(club => {
                if (club.image) {
                    club.image = club.image.replace(/\\/g, '/'); 
                    club.image = `/club_icons/${club.image.split('/').pop()}`;
                }
            });

            if (randomPlayer.image) {
                randomPlayer.image = randomPlayer.image.replace(/\\/g, '/');
                randomPlayer.image = `/player_icons/${randomPlayer.image.split('/').pop()}`;
            } else {
                randomPlayer.image = `/player_icons/default.png`
            }

            res.status(200).json({ success: true, data: randomPlayer });
        } else {
            res.status(404).json({ success: false, message: 'No players found' });
        }
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// POST /api/players (create a new player)
export const createPlayer = async(req, res) => {
    const player = req.body;

    if (!player.name) {
        return res.status(400).json({ success: false, message: 'Please provide a name' });
    }


    try {
        const existingPlayer = await Player.findOne({ name: player.name })

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
export const updatePlayer = async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findById(id);
        if (!player) {
            return res.status(404).json({ success: false, message: 'Player not found' });
        }

        // If a new image is uploaded, update the player's image field
        if (req.file) {
            const imagePath = `/player_icons/${req.file.filename}`;
            player.image = imagePath;
        }

        // Update the other player fields
        player.name = req.body.name || player.name;
        player.clubs = JSON.parse(req.body.clubs) || player.clubs;

        // Save the updated player
        await player.save();

        res.status(200).json({ success: true, message: 'Player updated successfully', data: player });
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


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