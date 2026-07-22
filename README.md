#  Uber Clone - Full Stack Ride Booking Platform

<p align="center">
  <img src="assets/banner.png" alt="Uber Clone Banner" width="100%">
</p>

<p align="center">

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-black?logo=socket.io)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Google Maps](https://img.shields.io/badge/Google-Maps-red?logo=googlemaps)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

---

#  Overview

Uber Clone is a **full-stack ride-booking application** inspired by Uber. The application allows users to request rides while nearby captains (drivers) receive ride requests in real time using **Socket.io**. It integrates **Google Maps APIs** for location services and uses **MongoDB geospatial queries** to identify the nearest available drivers.

The project demonstrates modern web development practices including authentication, REST APIs, real-time communication, geolocation, responsive UI, and scalable backend architecture.

---

#  Features

##  User Features

- User Registration & Login
- Secure JWT Authentication
- Google Places Autocomplete
- Pickup & Destination Selection
- Fare Estimation
- Vehicle Selection
- Request Ride
- OTP Verification
- Live Ride Tracking
- Ride Completion

---

## Captain Features

- Captain Registration & Login
- Vehicle Information Management
- Real-Time Location Updates
- Receive Nearby Ride Requests
- Accept Ride
- OTP Verification
- Start Ride
- End Ride

---

## System Features

- JWT Authentication
- Password Encryption (bcrypt)
- Google Maps API Integration
- MongoDB Geospatial Queries
- Real-Time Communication using Socket.io
- Responsive React UI
- Secure Logout using Token Blacklisting

---

#  Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- GSAP

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- JWT
- bcrypt

## APIs

- Google Maps Geocoding API
- Distance Matrix API
- Places Autocomplete API

---

# Project Architecture

```
                    User
                      │
               React Frontend
                      │
          REST API + Socket.io
                      │
             Express.js Backend
                      │
 ┌────────────────────┼────────────────────┐
 │                    │                    │
MongoDB         Google Maps API      Socket Server
 │                    │                    │
Users          Geocoding          Real-time Events
Captains       Distance           Ride Notifications
Rides          Autocomplete       Live Location
```

---

#  Project Structure

```
Uber-Clone
│
├── Backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── socket.js
│   ├── app.js
│   └── server.js
│
├── Frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── assets
│   │   └── App.jsx
│
└── README.md
```

---

#  Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/uber-clone.git

cd uber-clone
```

---

## Backend Setup

```bash
cd Backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

#  Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---


#  Ride Booking Flow

```
User Login

↓

Enter Pickup & Destination

↓

Fare Calculation

↓

Select Vehicle

↓

Ride Request Created

↓

Nearby Captains Notified

↓

Captain Accepts Ride

↓

OTP Verification

↓

Ride Starts

↓

Live Tracking

↓

Ride Ends
```

---


 **MIT License**.
