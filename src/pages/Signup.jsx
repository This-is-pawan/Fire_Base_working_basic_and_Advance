import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {app} from '../firebase'
const auth=getAuth()

const Signup = () => {
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
const createUser=()=>{
 createUserWithEmailAndPassword(auth,email,password).then((value)=>console.log('success')
 )
}

  return (
    <div className="w-[600px] p-8 m-auto border grid grid-cols-4  bg-pink-50">
      <label htmlFor="email">email</label>
      <input type="text" name="email" id="email" className="w-full " onChange={(e)=>setEmail(e.target.value)} />
      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        className="w-full " onChange={(e)=>setPassword(e.target.value)}
      />
      <button className="bg-pink-400 text-black p-1 m-2 w-full max-w-[100px]" onClick={createUser}>
        signup
      </button>
    </div>
  );
};

export default Signup;
