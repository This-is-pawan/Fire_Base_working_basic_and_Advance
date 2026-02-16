import {initializeApp} from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyCbSGbVd3I3MNgo39j1BXm9Utju2z-R7po",
  authDomain: "app-a899d.firebaseapp.com",
  projectId: "app-a899d",
  storageBucket: "app-a899d.firebasestorage.app",
  messagingSenderId: "644326920416",
  appId: "1:644326920416:web:137a5d9baab702ffd4c085",
  databaseURL:"https://app-a899d-default-rtdb.firebaseio.com"
};
export const app=initializeApp(firebaseConfig);