Euphora-API
Euphora-API is a music playlist management API that allows users to authenticate, create, update, delete playlists, and manage songs within those playlists. It also handles user authentication via JWT (JSON Web Tokens) for secure access to the API's endpoints.

Features
User registration and login
Create, read, update, and delete playlists
Add, update, and delete songs within playlists
JWT-based authentication for secure access to the API
Error handling for better user experience and debugging
Table of Contents
Project Setup
Environment Variables
Authentication
API Endpoints
Auth Routes
Playlist Routes
Song Routes
Error Messages
Project Setup
Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (v14 or higher)
MongoDB (running locally or through MongoDB Atlas)
Git
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/euphora-api.git
cd euphora-api
Install the dependencies:

bash
Copy code
npm install
Set up your environment variables in a .env file (see Environment Variables).

Start the MongoDB server if you're running it locally.

Start the server:

bash
Copy code
npm run dev
The server will be running on http://localhost:5000.

Environment Variables
In the root directory, create a .env file and include the following environment variables:

makefile
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/euphora
JWT_SECRET=your_jwt_secret_key
PORT: Port on which the server will run (default is 5000).
MONGO_URI: The connection string to your MongoDB instance.
JWT_SECRET: The secret key for signing JSON Web Tokens.
Authentication
Euphora-API uses JWT authentication. You must register a user and log in to receive a token. The token should be passed in the Authorization header as Bearer <your_token> for all protected routes.

Sample Authentication Header
makefile
Copy code
Authorization: Bearer <your_token>
API Endpoints
Auth Routes
1. Register
URL: /euphora/api/v1/auth/register

Method: POST

Description: Registers a new user.

Body:

json
Copy code
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "token": "your_jwt_token"
}
2. Login
URL: /euphora/api/v1/auth/login

Method: POST

Description: Logs in an existing user.

Body:

json
Copy code
{
  "email": "testuser@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "token": "your_jwt_token"
}
Playlist Routes
All playlist routes require the user to be authenticated.

1. Create a Playlist
URL: /euphora/api/v1/playlists

Method: POST

Description: Creates a new playlist.

Body:

json
Copy code
{
  "title": "My Playlist",
  "description": "A collection of my favorite songs"
}
Response:

json
Copy code
{
  "_id": "playlist_id",
  "user": "user_id",
  "title": "My Playlist",
  "description": "A collection of my favorite songs",
  "songs": []
}
2. Get All Playlists
URL: /euphora/api/v1/playlists
Method: GET
Description: Retrieves all playlists for the authenticated user.
3. Get a Playlist by ID
URL: /euphora/api/v1/playlists/:playlistId
Method: GET
Description: Retrieves a specific playlist by its ID.
4. Update a Playlist by ID
URL: /euphora/api/v1/playlists/:playlistId
Method: PUT
Description: Updates a playlist's title or description.
Body:
json
Copy code
{
  "title": "Updated Playlist Title",
  "description": "Updated description"
}
5. Delete a Playlist by ID
URL: /euphora/api/v1/playlists/:playlistId
Method: DELETE
Description: Deletes a specific playlist by its ID.
6. Delete All Playlists
URL: /euphora/api/v1/playlists
Method: DELETE
Description: Deletes all playlists for the authenticated user.
Song Routes
All song routes are tied to a specific playlist and require authentication.

1. Add a Song to a Playlist
URL: /euphora/api/v1/playlists/:playlistId/songs
Method: POST
Description: Adds a new song to a playlist.
Body:
json
Copy code
{
  "title": "Song Title",
  "artist": "Song Artist",
  "album": "Song Album"
}
2. Get All Songs from a Playlist
URL: /euphora/api/v1/playlists/:playlistId/songs
Method: GET
Description: Retrieves all songs from a specific playlist.
3. Update a Song
URL: /euphora/api/v1/playlists/:playlistId/songs/:songId
Method: PUT
Description: Updates a song's details (title, artist, or album).
Body:
json
Copy code
{
  "title": "Updated Song Title",
  "artist": "Updated Song Artist",
  "album": "Updated Song Album"
}
4. Delete a Song from a Playlist
URL: /euphora/api/v1/playlists/:playlistId/songs/:songId
Method: DELETE
Description: Deletes a specific song from a playlist.
5. Delete All Songs from a Playlist
URL: /euphora/api/v1/playlists/:playlistId/songs
Method: DELETE
Description: Deletes all songs from a specific playlist.
Error Messages
The API returns clear error messages in JSON format to help you debug and resolve issues.

Sample Error Responses
1. Unauthorized Access
json
Copy code
{
  "status": "error",
  "message": "Unauthorized",
  "error": {
    "code": 401,
    "details": "Authorization token missing"
  }
}
2. Invalid Token
json
Copy code
{
  "status": "error",
  "message": "Invalid token",
  "error": {
    "code": 400,
    "details": "Token verification failed"
  }
}
3. Server Error
json
Copy code
{
  "status": "error",
  "message": "Server error",
  "error": {
    "code": 500,
    "details": "An unexpected error occurred"
  }
}
Testing
To test the API, you can use Postman or any other API testing tool. Make sure to include the Authorization header with a valid JWT token for all protected routes.