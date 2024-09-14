// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDownloadURL, getStorage } from "firebase/storage";

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
export const storage = getStorage(app);

export const uploadFileToFirebaseStorage = async (file) => {
  const storageRef = ref(storage, "summit");
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  console.log("File uploaded to Firebase Storage.");
};

export const getDownURL = async (fileName) => {
  const fileRef = ref(storage, fileName);
  const downloadUrl = await getDownloadURL(fileRef);
  console.log("Download URL:", downloadUrl);
  return downloadUrl;
};
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
