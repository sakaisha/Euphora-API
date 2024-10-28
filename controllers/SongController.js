const Song = require('../models/song');
const Playlist = require('../models/playlist');

exports.addSong = async (req, res) => {
    try {
        const { title, artist, album } = req.body;
        const song = new Song({ title, artist, album });
        await song.save();

        let playlist = await Playlist.findById(req.params.playlistId);
        playlist.songs.push(song._id);
        await playlist.save();

        res.json(song);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getAllSongs = async (req, res) => {
    try {
        let playlist = await Playlist.findById(req.params.playlistId).populate('songs');

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
        res.status(500).send('Server error');
    }
};

exports.updateSong = async (req, res) => {
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
        res.status(500).send('Server error');
    }
};

exports.deleteSong = async (req, res) => {
    try {
        let song = await Song.findById(req.params.songId);
        if (!song) {
            return res.status(404).json({ msg: 'Song not found' });
        }
        await song.remove();
        res.json({ msg: 'Song removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.deleteAllSongs = async (req, res) => {
    try {
        let playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        playlist.songs = [];
        await playlist.save();

        res.json({ msg: 'All songs removed from the playlist' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};