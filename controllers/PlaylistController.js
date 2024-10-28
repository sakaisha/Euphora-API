const Playlist = require('../models/playlist');

exports.createPlaylist = async (req, res) => {
    try {
        const { title, description } = req.body;
        const playlist = new Playlist({
            user: req.user.id,
            title,
            description
        });
        await playlist.save();
        res.json(playlist);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user.id });
        res.json(playlists);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }
        res.json(playlist);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updatePlaylist = async (req, res) => {
    try {
        const { title, description } = req.body;
        let playlist = await Playlist.findById(req.params.id);
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

exports.deletePlaylist = async (req, res) => {
    try {
        let playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }
        await playlist.remove();
        res.json({ msg: 'Playlist removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.deleteAllPlaylists = async (req, res) => {
    try {
        const userPlaylists = await Playlist.deleteMany({ user: req.user.id });
        if (!userPlaylists) {
            return res.status(404).json({ msg: 'No playlists found for this user' });
        }

        res.json({ msg: 'All playlists deleted successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};