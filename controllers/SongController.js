import Song from "../models/song.js";
import Playlist from "../models/playlist.js";

// Add a song to a playlist
export const addSong = async (req, res) => {
    try {
        const { title, artist, album } = req.body;

        if (!title || !artist) {
            return res.status(400).json({ msg: 'Title and artist are required' });
        }

        const song = new Song({ title, artist, album });
        await song.save();

        let playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        playlist.songs.push(song._id);
        await playlist.save();

        res.json(song);
    } catch (err) {
        console.error("Error adding song:", err); // Improved error logging
        res.status(500).send('Server error');
    }
};

// Get all songs in a playlist, with optional keyword filtering
export const getAllSongs = async (req, res) => {
    try {
        let playlist = await Playlist.findById(req.params.playlistId).populate('songs');
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        const { keyword } = req.query;
        if (keyword) {
            const filteredSongs = playlist.songs.filter(
                song => song.title.toLowerCase().includes(keyword.toLowerCase()) ||
                        song.artist.toLowerCase().includes(keyword.toLowerCase())
            );
            return res.json(filteredSongs);
        }

        res.json(playlist.songs);
    } catch (err) {
        console.error("Error fetching songs:", err); // Improved error logging
        res.status(500).send('Server error');
    }
};

// Update a song in a playlist
export const updateSong = async (req, res) => {
    try {
        const { title, artist, album } = req.body;
        let song = await Song.findById(req.params.songId);
        if (!song) {
            return res.status(404).json({ msg: 'Song not found' });
        }

        song.title = title || song.title;
        song.artist = artist || song.artist;
        song.album = album || song.album;
        await song.save();

        res.json(song);
    } catch (err) {
        console.error("Error updating song:", err); // Improved error logging
        res.status(500).send('Server error');
    }
};

// Delete a song from a playlist
export const deleteSong = async (req, res) => {
    try {
        let playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        const songIndex = playlist.songs.indexOf(req.params.songId);
        if (songIndex === -1) {
            return res.status(404).json({ msg: 'Song not found in this playlist' });
        }

        playlist.songs.splice(songIndex, 1); // Remove song from playlist
        await playlist.save();

        await Song.findByIdAndDelete(req.params.songId); // Delete the song from the database

        res.json({ msg: 'Song removed from playlist and deleted' });
    } catch (err) {
        console.error("Error deleting song:", err); // Improved error logging
        res.status(500).send('Server error');
    }
};

// Delete all songs from a playlist
export const deleteAllSongs = async (req, res) => {
    try {
        let playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        playlist.songs = [];
        await playlist.save();

        await Song.deleteMany({ _id: { $in: playlist.songs } }); // Delete all songs from the playlist

        res.json({ msg: 'All songs removed from the playlist' });
    } catch (err) {
        console.error("Error deleting all songs:", err); // Improved error logging
        res.status(500).send('Server error');
    }
};