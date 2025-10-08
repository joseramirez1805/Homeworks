// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth()

export { app, auth } 