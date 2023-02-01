import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    let { user } = useAuth();
    let userEmail = user.email;
    return userEmail === "techclub@iiitkottayam.ac.in" ? children : user ? <Navigate to={'/main'} /> : <Navigate to={'/'} />;
};

export default ProtectedRoute;