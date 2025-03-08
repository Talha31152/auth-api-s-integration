import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRedirect = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? <Navigate to="/home" replace /> : <Outlet />;
};

export default AuthRedirect;
