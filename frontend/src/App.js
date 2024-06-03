import React from 'react'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Home from './Pages/Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />}></Route>
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}></Route>
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />}></Route>
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App

