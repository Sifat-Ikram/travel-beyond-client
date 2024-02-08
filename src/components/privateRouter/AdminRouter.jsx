import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    
    if(loading && isAdminLoading){
        return <span className="loading loading-dots loading-lg"></span>
    }

    if(user && isAdmin){
        return children;
    }
    return <Navigate state={location.pathname} to="/signIn"></Navigate>;
};

export default AdminRouter;