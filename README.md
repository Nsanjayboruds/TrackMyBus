🚌 Real-Time Bus Tracking App

A modern web application that allows users to track buses in real-time on an interactive map. Built with React + TypeScript + Firebase + Google Maps API, this app ensures accurate live bus tracking, authentication via Google, and a seamless user experience.

🚀 Features

✅ Google Authentication – Secure login with Google

✅ Real-Time Bus Tracking – Live bus location updates on the map

✅ Firebase Integration – Authentication & real-time database support

✅ Responsive UI – Works smoothly on desktop & mobile

✅ Driver & Passenger Modes – Separate views for drivers (location update) and passengers (tracking)

✅ Minimal & Fast – Lightweight and easy-to-use interface

🛠️ Tech Stack

Frontend: React + TypeScript

Backend: Firebase (Auth + Firestore)

Maps: Google Maps API

State Management: React Context API / Redux (optional)

Hosting: Firebase Hosting / Vercel / Netlify

⚙️ Installation

Clone the repository
git clone https://github.com/your-username/bus-tracking-app.git
cd bus-tracking-app

Install dependencies

npm install

Set up Firebase

    Go to Firebase Console

    Create a new project

    Enable Authentication (Google Sign-In)

    Create a Firestore Database

    Copy Firebase config and add it in .env

Example .env file:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key

Start the development server

    npm run dev

📌 Usage

    👤 Login with Google

    🚌 Drivers – Share their live location (auto updates to Firestore).

    👥 Passengers – View buses in real-time on Google Maps.



🚍 [Add some screenshots of your app UI]
🌍 Deployment

You can deploy easily on:

    Firebase Hosting – firebase deploy

    Vercel – Connect GitHub repo & deploy

    Netlify – Drag & drop build folder




























































