import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBrUTV6uTIIM2vsuNTmsfbC-TrnK_2LRIE",
  authDomain: "clase-09-firebase.firebaseapp.com",
  projectId: "clase-09-firebase",
  storageBucket: "clase-09-firebase.firebasestorage.app",
  messagingSenderId: "103122508329",
  appId: "1:103122508329:web:c27eb5330db0ef9a1c5a38",
  measurementId: "G-S4XET95JR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase auth
const auth = getAuth(app)

const firebaseStorage = getStorage(app)
const db = getFirestore(app)

export { app, auth, firebaseStorage, db } 