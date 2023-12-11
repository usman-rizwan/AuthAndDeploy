// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     onAuthStateChanged,
//     sendEmailVerification,
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import {
//     getFirestore,
//     collection,
//     addDoc,
//     getDocs,
//     doc,
//     setDoc,
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyD7pvJuZOX2O-tZJRfcuhPSUyZDZyi1Wbs",
//     authDomain: "fir-users-auth-fc835.firebaseapp.com",
//     projectId: "fir-users-auth-fc835",
//     storageBucket: "fir-users-auth-fc835.appspot.com",
//     messagingSenderId: "240085089487",
//     appId: "1:240085089487:web:e18821a8d60a10123b4bba",
// };

// export {getAuth , }
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc ,doc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyD7pvJuZOX2O-tZJRfcuhPSUyZDZyi1Wbs",
  authDomain: "fir-users-auth-fc835.firebaseapp.com",
  projectId: "fir-users-auth-fc835",
  storageBucket: "fir-users-auth-fc835.appspot.com",
  messagingSenderId: "240085089487",
  appId: "1:240085089487:web:e18821a8d60a10123b4bba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export {
  getAuth,
  createUserWithEmailAndPassword,
  app,
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  collection,
  addDoc,
  setDoc,
  doc,
  db
};
