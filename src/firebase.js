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
  // This URL is essential for connecting your code to your specific database
  databaseURL: "https://myportfolio-4225b-default-rtdb.firebaseio.com/" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export 'db' so you can use it in AdminSettings.jsx
export const db = getDatabase(app);