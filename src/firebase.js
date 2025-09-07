import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace these values with your actual Firebase config from the console
const firebaseConfig = {
  apiKey: "AIzaSyDl1prT3AhRlae_gvr5Km51-yRdiig-0lY",
  authDomain: "reel-manager.firebaseapp.com",
  projectId: "reel-manager",
  storageBucket: "reel-manager.firebasestorage.app",
  messagingSenderId: "117237623692",
  appId: "1:117237623692:web:cbb59b2678c479445844a9",
  measurementId: "G-9VKSL4HB27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
