import Club from '../models/clubModel.js';

// GET /api/clubs (retrieve all clubs)
export const getClubs = async (req, res) => {
    try {
        const clubs = await Club.find({}); // Fetch all clubs from the database
        res.status(200).json({ success: true, data: clubs });
    } catch (error) {
        console.error('Error fetching clubs', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// GET /api/clubs/:id (retrieve one club)
export const getClub = async (req, res) => {
    const { id } = req.params;

    try {
        const club = await Club.findById(id);
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        // replace backslashes with forward slashes
        if (club.image) {
            club.image = club.image.replace(/\\/g, '/'); 

            // Adjust image path for frontend usage (get filename only)
            club.image = `/club_icons/${club.image.split('/').pop()}`;
        } else {
            // If no image exists, remove the image field from the response
            delete club.image;
        }

        return res.status(200).json({ success: true, message: 'Club fetched successfully', data: club });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// POST /api/clubs (create a new club)
export const createClub = async (req, res) => {
    const club = req.body;

    if (!club.name) {
        return res.status(400).json({ success: false, message: 'Please provide a name' });
    }

    try {
        const existingClub = await Club.findOne({ name: club.name });

        // Check if a club with the same name already exists
        if (existingClub) {
            return res.status(400).json({ success: false, message: 'Club already exists' })
        }

        // create club if no club with the same name exists yet
        const newClub = new Club(club);
        await newClub.save();
        res.status(201).json({ success: true, data: newClub });
        
    } catch (error) {
        console.error('Error in create club', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// PATCH /api/clubs/:id (update a club)
export const updateClub = async (req, res) => {
    const { id } = req.params;
    const club = req.body;

    // If there's an image in the request, update the club's image field
    if (req.file) {
        club.image = req.file.path.replace('frontend/football-project/public/', ''); // Adjust image path
    }

    try {
        const updatedClub = await Club.findByIdAndUpdate(id, club, { new: true });

        if (!updatedClub) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }

        res.status(200).json({ success: true, data: updatedClub });
    } catch (error) {
        console.error('Error updating club:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// DELETE /api/clubs/:id (delete club)
export const deleteClub = async (req, res) => {
    const { id } = req.params;
    console.log(`ID: ${id}`);

    try {
        await Club.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Club deleted' });
    } catch (error) {
        console.log(error);
    }
}