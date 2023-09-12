// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	 apiKey: "AIzaSyB3YDPd3m6_CcFqaj6tUMOFkHRd9kFB1G4",
  authDomain: "ecommerce-v1-7be2a.firebaseapp.com",
  projectId: "ecommerce-v1-7be2a",
  storageBucket: "ecommerce-v1-7be2a.appspot.com",
  messagingSenderId: "300661382905",
  appId: "1:300661382905:web:d6b67b7892e32d2b548c28",
  measurementId: "G-KWJSMXV96P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
