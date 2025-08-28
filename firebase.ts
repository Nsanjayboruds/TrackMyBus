// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChV8qrpQgKSbzovFfJ3zVr1fe2wN1nGh4",
  authDomain: "hrs-roadways.firebaseapp.com",
  projectId: "hrs-roadways",
  storageBucket: "hrs-roadways.firebasestorage.app",
  messagingSenderId: "914405080800",
  appId: "1:914405080800:web:c48cf21e3cdbfd53fc1a85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);