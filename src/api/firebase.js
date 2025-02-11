// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  set,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9mLHxFFRn4iQy7zB2qn7mz6jjBskYabI",
  authDomain: "football-test-81e33.firebaseapp.com",
  databaseURL:
    "https://football-test-81e33-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "football-test-81e33",
  storageBucket: "football-test-81e33.firebasestorage.app",
  messagingSenderId: "969492183994",
  appId: "1:969492183994:web:7cbf46dab6e441a0597b83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, child, database, get, ref, remove, set };
