// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCagbSsMTKaLi51779LWosXchBkdfQqLb8",
  authDomain: "webcade2024.firebaseapp.com",
  projectId: "webcade2024",
  storageBucket: "webcade2024.appspot.com",
  messagingSenderId: "992688285255",
  appId: "1:992688285255:web:017319afc740cab21ab362",
  measurementId: "G-605SHGHW6M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
