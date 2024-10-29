import { Router } from "express"; 
import { register, login } from "../controllers/AuthController.js";
import { createPlaylist, getAllPlaylists, getPlaylist, updatePlaylist, deletePlaylist, deleteAllPlaylists } from "../controllers/PlaylistController.js";
import { addSong, getAllSongs, updateSong, deleteSong, deleteAllSongs } from "../controllers/SongController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";  // Import the auth middleware

const router = Router();

// Auth Endpoints
router.post('/auth/register', register);  // Register a new user
router.post('/auth/login', login);        // Log in an existing user

// Playlist Endpoints (Protected by authentication middleware)
router.post('/playlists', AuthMiddleware.isAuthorized, createPlaylist);  // Create a new playlist
router.get('/playlists', AuthMiddleware.isAuthorized, getAllPlaylists);  // Get all playlists
router.get('/playlists/:playlistId', AuthMiddleware.isAuthorized, getPlaylist);  // Get a specific playlist by ID
router.put('/playlists/:playlistId', AuthMiddleware.isAuthorized, updatePlaylist);  // Update a specific playlist by ID
router.delete('/playlists/:playlistId', AuthMiddleware.isAuthorized, deletePlaylist);  // Delete a specific playlist by ID
router.delete('/playlists', AuthMiddleware.isAuthorized, deleteAllPlaylists);  // Delete all playlists for the authenticated user

// Song Endpoints (Protected by authentication middleware)
router.post('/playlists/:playlistId/songs', AuthMiddleware.isAuthorized, addSong);  // Add a new song to a playlist
router.get('/playlists/:playlistId/songs', AuthMiddleware.isAuthorized, getAllSongs);  // Get all songs from a playlist
router.put('/playlists/:playlistId/songs/:songId', AuthMiddleware.isAuthorized, updateSong);  // Update a specific song in a playlist
router.delete('/playlists/:playlistId/songs/:songId', AuthMiddleware.isAuthorized, deleteSong);  // Delete a specific song from a playlist
router.delete('/playlists/:playlistId/songs', AuthMiddleware.isAuthorized, deleteAllSongs);  // Delete all songs from a playlist

export default router;