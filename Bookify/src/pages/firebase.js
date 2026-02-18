
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDq4H7-09CrRi-fk10TXMNywSaqzPyLAzE",
  authDomain: "bookify-e3063.firebaseapp.com",
  projectId: "bookify-e3063",
  storageBucket: "bookify-e3063.firebasestorage.app",
  messagingSenderId: "391679805330",
  appId: "1:391679805330:web:cb12d4f37e2716d64ee34b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);