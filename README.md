Here’s a comprehensive `README.md` for your project:

---

# Euphora-API

Euphora-API is a music playlist management API that allows users to authenticate, create, update, delete playlists, and manage songs within those playlists. It also handles user authentication via JWT (JSON Web Tokens) for secure access to the API's endpoints.

## Features

- User registration and login
- Create, read, update, and delete playlists
- Add, update, and delete songs within playlists
- JWT-based authentication for secure access to the API
- Error handling for better user experience and debugging

## Table of Contents

- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [Playlist Routes](#playlist-routes)
  - [Song Routes](#song-routes)
- [Error Messages](#error-messages)

## Project Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or through MongoDB Atlas)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/euphora-api.git
   cd euphora-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file (see [Environment Variables](#environment-variables)).

4. Start the MongoDB server if you're running it locally.

5. Start the server:

   ```bash
   npm run dev
   ```

6. The server will be running on `http://localhost:5000`.

### Environment Variables

In the root directory, create a `.env` file and include the following environment variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/euphora
JWT_SECRET=your_jwt_secret_key
```

- **PORT**: Port on which the server will run (default is 5000).
- **MONGO_URI**: The connection string to your MongoDB instance.
- **JWT_SECRET**: The secret key for signing JSON Web Tokens.

## Authentication

Euphora-API uses JWT authentication. You must register a user and log in to receive a token. The token should be passed in the `Authorization` header as `Bearer <your_token>` for all protected routes.

### Sample Authentication Header

```
Authorization: Bearer <your_token>
```

## API Endpoints

### Auth Routes

#### 1. Register

- **URL**: `/euphora/api/v1/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Body**:
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

- **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

#### 2. Login

- **URL**: `/euphora/api/v1/auth/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Body**:
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

- **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### Playlist Routes

All playlist routes require the user to be authenticated.

#### 1. Create a Playlist

- **URL**: `/euphora/api/v1/playlists`
- **Method**: `POST`
- **Description**: Creates a new playlist.
- **Body**:
  ```json
  {
    "title": "My Playlist",
    "description": "A collection of my favorite songs"
  }
  ```

- **Response**:
  ```json
  {
    "_id": "playlist_id",
    "user": "user_id",
    "title": "My Playlist",
    "description": "A collection of my favorite songs",
    "songs": []
  }
  ```

#### 2. Get All Playlists

- **URL**: `/euphora/api/v1/playlists`
- **Method**: `GET`
- **Description**: Retrieves all playlists for the authenticated user.

#### 3. Get a Playlist by ID

- **URL**: `/euphora/api/v1/playlists/:playlistId`
- **Method**: `GET`
- **Description**: Retrieves a specific playlist by its ID.

#### 4. Update a Playlist by ID

- **URL**: `/euphora/api/v1/playlists/:playlistId`
- **Method**: `PUT`
- **Description**: Updates a playlist's title or description.
- **Body**:
  ```json
  {
    "title": "Updated Playlist Title",
    "description": "Updated description"
  }
  ```

#### 5. Delete a Playlist by ID

- **URL**: `/euphora/api/v1/playlists/:playlistId`
- **Method**: `DELETE`
- **Description**: Deletes a specific playlist by its ID.

#### 6. Delete All Playlists

- **URL**: `/euphora/api/v1/playlists`
- **Method**: `DELETE`
- **Description**: Deletes all playlists for the authenticated user.

### Song Routes

All song routes are tied to a specific playlist and require authentication.

#### 1. Add a Song to a Playlist

- **URL**: `/euphora/api/v1/playlists/:playlistId/songs`
- **Method**: `POST`
- **Description**: Adds a new song to a playlist.
- **Body**:
  ```json
  {
    "title": "Song Title",
    "artist": "Song Artist",
    "album": "Song Album"
  }
  ```

#### 2. Get All Songs from a Playlist

- **URL**: `/euphora/api/v1/playlists/:playlistId/songs`
- **Method**: `GET`
- **Description**: Retrieves all songs from a specific playlist.

#### 3. Update a Song

- **URL**: `/euphora/api/v1/playlists/:playlistId/songs/:songId`
- **Method**: `PUT`
- **Description**: Updates a song's details (title, artist, or album).
- **Body**:
  ```json
  {
    "title": "Updated Song Title",
    "artist": "Updated Song Artist",
    "album": "Updated Song Album"
  }
  ```

#### 4. Delete a Song from a Playlist

- **URL**: `/euphora/api/v1/playlists/:playlistId/songs/:songId`
- **Method**: `DELETE`
- **Description**: Deletes a specific song from a playlist.

#### 5. Delete All Songs from a Playlist

- **URL**: `/euphora/api/v1/playlists/:playlistId/songs`
- **Method**: `DELETE`
- **Description**: Deletes all songs from a specific playlist.

## Error Messages

The API returns clear error messages in JSON format to help you debug and resolve issues.

### Sample Error Responses

#### 1. Unauthorized Access

```json
{
  "status": "error",
  "message": "Unauthorized",
  "error": {
    "code": 401,
    "details": "Authorization token missing"
  }
}
```

#### 2. Invalid Token

```json
{
  "status": "error",
  "message": "Invalid token",
  "error": {
    "code": 400,
    "details": "Token verification failed"
  }
}
```

#### 3. Server Error

```json
{
  "status": "error",
  "message": "Server error",
  "error": {
    "code": 500,
    "details": "An unexpected error occurred"
  }
}
```

## Testing

To test the API, you can use [Postman](https://www.postman.com/) or any other API testing tool. Make sure to include the `Authorization` header with a valid JWT token for all protected routes.

---
