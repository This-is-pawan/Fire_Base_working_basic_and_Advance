import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <div>
      <ToastContainer  position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
 
  limit={3} />
     <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App