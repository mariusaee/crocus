// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk80M4E6S0FIur4xtmjFrhFUESwwer_o0",
  authDomain: "crocus-garden.firebaseapp.com",
  databaseURL: "https://crocus-garden-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "crocus-garden",
  storageBucket: "crocus-garden.firebasestorage.app",
  messagingSenderId: "960222723188",
  appId: "1:960222723188:web:13a958c7af21424256a521",
  measurementId: "G-EJH93EZHLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
