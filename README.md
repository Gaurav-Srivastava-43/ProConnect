# ProConnect

ProConnect is a full-stack social media web application built using the **MERN stack** and **Bootstrap**. It allows users to create posts and stories, interact with other users, follow users, and communicate through real-time chat.

## Features

* User registration and JWT-based login
* User profiles and profile editing
* Create, like, comment and delete posts
* Create and view 24-hour stories
* Follow and unfollow users
* User search
* Real-time chat using Socket.IO
* Image/video/file uploads
* Responsive Bootstrap UI
* MongoDB-based data storage

## Tech Stack

**Frontend**

* React.js
* React Router
* Bootstrap / React-Bootstrap
* Axios
* Socket.IO Client

**Backend**

* Node.js
* Express.js
* MongoDB / Mongoose
* Socket.IO
* JWT
* bcrypt
* Multer

## Project Structure

```text
ProConnect/
├── client/     # React frontend
└── server/     # Node.js + Express backend
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Gaurav-Srivastava-43/ProConnect.git
cd ProConnect
```

### 2. Install client dependencies

```bash
cd client
npm install
```

Create a `.env` file inside `client`:

```env
REACT_APP_API_BASE_URL=http://localhost:6001
```

Start the frontend:

```bash
npm start
```

### 3. Install server dependencies

Open another terminal:

```bash
cd server
npm install
```

Create a `.env` file inside `server`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=6001
```

Start the backend:

```bash
npm start
```

## Deployment

* **Frontend:** Vercel
* **Backend:** Render (Free Tier)
* **Database:** MongoDB

The frontend communicates with the deployed Express/Socket.IO backend through the configured API URL.

## Live Application

**Frontend:** `https://pro-connect-flax.vercel.app/`

**Backend:** `https://proconnect-server-229a.onrender.com`

## License

This project is developed for educational and project purposes.
