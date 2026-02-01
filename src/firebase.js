import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // 👈 1. Storage module import kiya

const firebaseConfig = {
  apiKey: "AIzaSyDh8cUZP6UWWDgQZJL6_mL-AghGosXyopQ",
  authDomain: "myportfolio-4225b.firebaseapp.com",
  projectId: "myportfolio-4225b",
  storageBucket: "myportfolio-4225b.firebasestorage.app",
  messagingSenderId: "715947684019",
  appId: "1:715947684019:web:1a1e9d2782dc439a88c0c6",
  measurementId: "G-PPSVMH259Z",
  // Updated Database URL for Singapore Region
  databaseURL: "https://myportfolio-4225b-default-rtdb.asia-southeast1.firebasedatabase.app/" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- Exports ---
// 'db' Realtime Database ke liye aur 'storage' Files/PDF upload ke liye
export const db = getDatabase(app);
export const storage = getStorage(app); // 👈 2. 'storage' ko export kiya taaki AdminSettings ise use kar sake