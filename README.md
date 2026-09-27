# URL Shortener

A full-stack URL shortening application built with React.js, Node.js, Express.js, and MongoDB, with authentication, URL management, and click analytics.

## Features

* JWT authentication
* Secure HTTP-only cookies
* URL shortening with NanoID
* URL ownership and protected routes
* Search and sorting
* Pagination
* Click analytics
* Device, browser, and operating-system analytics
* Clicks-per-day chart
* Rate limiting
* Helmet security
* Centralized error handling

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* NanoID

## Project Structure

url-shortener/
├── client/
└── server/

## Environment Variables

Create a `.env` file in the `server` directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

Create a `.env` file in the `client` directory:

VITE_API_URL=http://localhost:5000

Never commit your actual `.env` files to GitHub.

## Running Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will run on the Vite development server and communicate with the Express backend.

## Core Functionality

Users can register and log in securely, create shortened URLs, manage their own URLs, and view analytics for each shortened URL.

The analytics dashboard tracks:

* Total clicks
* Today's clicks
* Clicks per day
* Devices
* Browsers
* Operating systems
* Referrers
