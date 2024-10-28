const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
});

module.exports = mongoose.model('Playlist', PlaylistSchema);