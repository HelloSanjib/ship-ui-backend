# Ship UI - Backend

This is the Node.js + Express REST API supporting the AI Component Generator project (**Ship UI**).

## Tech Stack
- **Server**: Node.js and Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT Cookies & Google Auth Library 
- **Utilities**: CORS, Cookie-Parser, Dotenv

## Getting Started

1. Set up your `.env` variables:
```
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_encoded_password@cluster0...
JWT_SECRET=your_secret_jwt_string
GOOGLE_CLIENT_ID=your_google_client_id
CLIENT_URL=http://localhost:5173 
```
*(Note: Be sure your database password string is URL-encoded if it contains special characters like `@`!)*

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## Features
- Protected RESTful routes via JWT and HTTP-Only cookies
- Secure Google Token verification (via `@google/auth-library`)
- History management and synchronization for users
- Robust CORS configuration accommodating custom client URLs
