import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthRedirect from "./components/AuthRedirect";



function App() {

  return (
    <>
      <div><Toaster /></div>
      <Routes>

        <Route element={<AuthRedirect />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>        
          <Route path="home" element={<Home />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </>
  )
}

export default App
