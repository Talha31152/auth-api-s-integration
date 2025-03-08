import React from 'react'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    return (      
            user?<Outlet />:<Navigate to="/" replace/>
    )
}

export default ProtectedRoute