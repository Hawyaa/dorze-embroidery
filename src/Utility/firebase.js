// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMqgdFrxo5NOLdUfnunvb3qSGSsnDnAwU",
  authDomain: "amina-embroidery-backend.firebaseapp.com",
  projectId: "amina-embroidery-backend",
  storageBucket: "amina-embroidery-backend.firebasestorage.app",
  messagingSenderId: "503491295751",
  appId: "1:503491295751:web:6483b01304e3415617c8a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);