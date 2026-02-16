import React, { createContext,useContext } from 'react'
const FirebaseContext = createContext(null)
export const useFirebaseContext=()=>useContext(FirebaseContext)

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase,set ,ref} from 'firebase/database';
import { app } from '../firebase';

const database=getDatabase(app);//DB to push the data
const firebaseAuth=getAuth(app)
export const FirebaseProvider = ({children}) => {
  const singupUserWithEmailAndPassword=(email,password)=>{
   return createUserWithEmailAndPassword(firebaseAuth,email,password)
  }

  // PutData
  const putData=(key,data)=>{
return set(ref(database,key),data)
  }
  
  return (
    <FirebaseContext.Provider value={{singupUserWithEmailAndPassword,putData}}>
  {children}
    </FirebaseContext.Provider>
  )
}


