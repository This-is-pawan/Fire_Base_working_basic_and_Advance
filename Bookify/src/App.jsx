import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  theme="colored"
  limit={3} />
      <h1>bookify</h1>

      <Routes>
        <Route path='/' element={<h1>home</h1>}/>
        <Route path='/login' element={<h1>login</h1>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App