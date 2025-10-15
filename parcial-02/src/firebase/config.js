// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsrVIqriSfqFyyvp0OONQcu7Dg1wKRAEw",
  authDomain: "parcial-02-3cf3a.firebaseapp.com",
  projectId: "parcial-02-3cf3a",
  storageBucket: "parcial-02-3cf3a.firebasestorage.app",
  messagingSenderId: "342520715509",
  appId: "1:342520715509:web:4ecf602a5781e1f0818dbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, getDatabase, ref, set, push, onValue };
