import { configDotenv } from "dotenv";
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";

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
