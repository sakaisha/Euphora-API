const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', required: false }, // Playlist association
});

module.exports = mongoose.model('Song', SongSchema);