// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIhUIVNArrDcg_KWOOaj-NJzYBdTwwQ6Q",
  authDomain: "netflixgpt-b706a.firebaseapp.com",
  projectId: "netflixgpt-b706a",
  storageBucket: "netflixgpt-b706a.firebasestorage.app",
  messagingSenderId: "899388640701",
  appId: "1:899388640701:web:cf4eb3627d6d91a48396d4",
  measurementId: "G-6S5DZXZHD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
