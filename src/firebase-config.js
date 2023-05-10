// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCke_6wBLigt3n6BugUGsG5wIllNQIos4c",
  authDomain: "tle2-46736.firebaseapp.com",
  databaseURL: "https://tle2-46736-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tle2-46736",
  storageBucket: "tle2-46736.appspot.com",
  messagingSenderId: "721193953439",
  appId: "1:721193953439:web:679663c2301709b5481aaa",
  measurementId: "G-2Z421E3JXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);