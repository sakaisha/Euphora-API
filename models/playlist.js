import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
});

// Define the Playlist model
const Playlist = mongoose.model('Playlist', PlaylistSchema);

// Export the model as default
export default Playlist;