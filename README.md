# Project Setup and Running Instructions

This project consists of a backend server and a frontend React application.

## Backend

### Description
The backend is an Express server with MongoDB for data storage and Socket.io for real-time messaging.

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB instance (local or cloud)
- Environment variables:
  - `MONGO_URI`: MongoDB connection string
  - `PORT`: (optional) port number for the backend server (default: 5000)

### Setup and Run
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   For development with auto-restart on changes, use:
   ```bash
   npm run dev
   ```

## Frontend

### Description
The frontend is a React application using React Router for navigation.

### Prerequisites
- Node.js (version 14 or higher)
- Environment variable:
  - `REACT_APP_API_URL`: Base URL for the backend API (e.g., `http://localhost:5000/api`)

### Setup and Run
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the React development server:
   ```bash
   npm start
   ```

## Running Both Backend and Frontend Concurrently

You can open two terminal windows/tabs and run the backend and frontend servers separately as described above.

## Notes

- Ensure MongoDB is running and accessible via the connection string.
- Adjust environment variables as needed for your deployment environment.
- The backend server runs on port 5000 by default.
- The frontend React app runs on port 3000 by default.

## Contact

For any issues or questions, please contact the project maintainer.
