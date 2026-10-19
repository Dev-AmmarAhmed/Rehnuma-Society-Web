// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// Rehnuma Society - Firebase Project Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhqwwXZ6k8Zm4lCVd8UFLcYaqqIg-5j6Q",
  authDomain: "rehnuma-society-46.firebaseapp.com",
  projectId: "rehnuma-society-46",
  storageBucket: "rehnuma-society-46.firebasestorage.app",
  messagingSenderId: "28094307245",
  appId: "1:28094307245:web:32f876396b5fc7293f1f24",
  databaseURL: "https://rehnuma-society-46-default-rtdb.firebaseio.com"
};

// Initialize Core App Instance
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// Secondary Auth Instance (Admin dashboard se bina logout hue naye member create karne ke liye)
const secondaryApp = initializeApp(firebaseConfig, "SecondaryAuthInstance");
export const secondaryAuth = getAuth(secondaryApp);

export default app;
