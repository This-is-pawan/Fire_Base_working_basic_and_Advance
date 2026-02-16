import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {app} from '../firebase'
const auth=getAuth(app)

const Signin = () => {
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
const siginUser=()=>{
 signInWithEmailAndPassword(auth,email,password).then((value)=>console.log('sigin-success')
 ).catch((error)=>console.log(error)
 )
}

  return (
   <>
   <h1 className="text-[2rem] text-center p-2 capitalize font-bold tracking-wider">signin page</h1>
    <div className="w-[600px] p-8 m-auto border grid grid-cols-4  bg-pink-50">
      <input type="text" name="email" id="email" className="w-full " onChange={(e)=>setEmail(e.target.value)} />
      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        className="w-full " onChange={(e)=>setPassword(e.target.value)}
      />
      <button className="bg-pink-400 text-black p-1 m-2 w-full max-w-[100px]" onClick={siginUser}>
        signin me in
      </button>
    </div>
    </>
  );
};

export default Signin;
