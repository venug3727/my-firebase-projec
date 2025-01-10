// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS27RDZrx72z7QwnedhX7iVkLXJW4t4Oc",
  authDomain: "persnal-website-9ab5f.firebaseapp.com",
  projectId: "persnal-website-9ab5f",
  storageBucket: "persnal-website-9ab5f.firebasestorage.app",
  messagingSenderId: "135506035497",
  appId: "1:135506035497:web:62199e679d661e2b3d6d38",
  measurementId: "G-2KE6NK0XY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, functions };
