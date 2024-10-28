const express = require('express');
const AuthController = require('../controllers/AuthController');
const PlaylistController = require('../controllers/PlaylistController');
const SongController = require('../controllers/SongController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Authentication
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Playlists
router.post('/playlists', authMiddleware, PlaylistController.createPlaylist);
router.get('/playlists', authMiddleware, PlaylistController.getAllPlaylists);
router.get('/playlists/:id', authMiddleware, PlaylistController.getPlaylist);
router.put('/playlists/:id', authMiddleware, PlaylistController.updatePlaylist);
router.delete('/playlists/:id', authMiddleware, PlaylistController.deletePlaylist);
router.delete('/playlists', authMiddleware, PlaylistController.deleteAllPlaylists);

// Songs
router.post('/playlists/:playlistId/songs', authMiddleware, SongController.addSong);
router.get('/playlists/:playlistId/songs', authMiddleware, SongController.getAllSongs);
router.put('/playlists/:playlistId/songs/:songId', authMiddleware, SongController.updateSong);
router.delete('/playlists/:playlistId/songs/:songId', authMiddleware, SongController.deleteSong);
router.delete('/playlists/:playlistId/songs', authMiddleware, SongController.deleteAllSongs);

module.exports = router;