import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Required for cloud syncing

const firebaseConfig = {
  apiKey: "AIzaSyDh8cUZP6UWWDgQZJL6_mL-AghGosXyopQ",
  authDomain: "myportfolio-4225b.firebaseapp.com",
  projectId: "myportfolio-4225b",
  storageBucket: "myportfolio-4225b.firebasestorage.app",
  messagingSenderId: "715947684019",
  appId: "1:715947684019:web:1a1e9d2782dc439a88c0c6",
  measurementId: "G-PPSVMH259Z",
  // UPDATED: This now points to your Singapore (asia-southeast1) instance
  databaseURL: "https://myportfolio-4225b-default-rtdb.asia-southeast1.firebasedatabase.app/" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export 'db' so you can use it in AdminSettings.jsx and Home.jsx
export const db = getDatabase(app);