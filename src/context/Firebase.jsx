import React, { createContext,useContext } from 'react'
const FirebaseContext = createContext(null)
export const useFirebaseContext=()=>useContext(FirebaseContext)
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase,set ,ref} from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyCbSGbVd3I3MNgo39j1BXm9Utju2z-R7po",
  authDomain: "app-a899d.firebaseapp.com",
  projectId: "app-a899d",
  storageBucket: "app-a899d.firebasestorage.app",
  messagingSenderId: "644326920416",
  appId: "1:644326920416:web:137a5d9baab702ffd4c085",
  databaseURL:"https://app-a899d-default-rtdb.firebaseio.com" //add db url
};
const FirebaseApp=initializeApp(firebaseConfig);
const database=getDatabase(FirebaseApp);
const firebaseAuth=getAuth(FirebaseApp)
export const FirebaseProvider = ({children}) => {
  const singupUserWithEmailAndPassword=(email,password)=>{
   return createUserWithEmailAndPassword(firebaseAuth,email,password)
    
  }
  const putData=(key,data)=>{
return set(ref(database,key),data)
  }
  return (
    <FirebaseContext.Provider value={{singupUserWithEmailAndPassword,putData}}>
  {children}
    </FirebaseContext.Provider>
  )
}


