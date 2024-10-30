import Playlist from "../models/playlist.js";
import Song from "../models/song.js";

// Create a new playlist
export const createPlaylist = async (req, res) => {
    try {
        console.log("Request user:", req.user);  // Log the user
        console.log("Request body:", req.body);  // Log the request body
        
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ msg: 'Title and description are required' });
        }

        const playlist = new Playlist({
            user: req.user.id,
            title,
            description
        });
        await playlist.save();
        res.json(playlist);
    } catch (err) {
        console.error("Error creating playlist:", err);  // Log the error
        res.status(500).send('Server error');
    }
};

// Get all playlists for the authenticated user
export const getAllPlaylists = async (req, res) => {
    try {
        console.log("Request user:", req.user);  // Log the user
        
        const playlists = await Playlist.find({ user: req.user.id });
        res.json(playlists);
    } catch (err) {
        console.error("Error getting playlists:", err);  // Log the error
        res.status(500).send('Server error');
    }
};

// Get a specific playlist by ID
export const getPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }
        res.json(playlist);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Update a specific playlist by ID
export const updatePlaylist = async (req, res) => {
    try {
        const { title, description } = req.body;
        let playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }
        playlist.title = title || playlist.title;
        playlist.description = description || playlist.description;
        await playlist.save();
        res.json(playlist);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Delete a specific playlist by ID
export const deletePlaylist = async (req, res) => {
    try {
        // Find the playlist by ID
        let playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        // Remove associated songs first (if necessary)
        await Song.deleteMany({ _id: { $in: playlist.song } });

        // Then remove the playlist itself
        await Playlist.findByIdAndDelete(req.params.playlistId);

        res.json({ msg: 'Playlist and associated songs removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete all playlists for the authenticated user
export const deleteAllPlaylists = async (req, res) => {
    try {
        const userPlaylists = await Playlist.deleteMany({ user: req.user.id });
        if (!userPlaylists.deletedCount) {
            return res.status(404).json({ msg: 'No playlists found for this user' });
        }
        res.json({ msg: 'All playlists deleted successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};