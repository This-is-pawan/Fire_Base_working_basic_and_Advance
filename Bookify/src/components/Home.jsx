import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'

const Home = () => {
  const firebase = useFirebase()

  const img = firebase?.user?.photoURL
  const name = firebase?.user?.displayName
  const email = firebase?.user?.email
  const [books,setBooks]=useState([])
useEffect(()=>{
firebase.listAllBooks().then((docs)=>setBooks(docs.docs)
)
},[])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center px-6">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center hover:scale-105 transition duration-300">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome Home 👋
        </h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={img || "https://picsum.photos/200"}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-pink-300 shadow-md object-cover"
          />
        </div>

        {/* User Info */}
        <h2 className="text-xl font-semibold text-gray-700">{name || "No Name"}</h2>
        <p className="text-gray-500 mb-6">{email || "No Email"}</p>

        {/* Button */}
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300">
          Edit Profile
        </button>
<h1 className='p-3'>list books</h1>
{books.map((card)=>{
  return <div>
  <h1>{card}</h1>
</div>
})}
</div>
    </div>
  )
}

export default Home
