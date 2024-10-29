import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', required: false }, // Playlist association
});

// Define the Song model
const Song = mongoose.model('Song', SongSchema);

// Export the model as default
export default Song;