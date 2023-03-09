import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation,Navigate,Outlet } from 'react-router-dom';

const RequireAuth = ({allowedRoles}) => {
  const {auth} =  useAuth();
  const location = useLocation();
  
   return (
        auth?.roles?.find(role => allowedRoles.includes(role))
         ? <Outlet />
          : auth?.user 
            ? <Navigate to='/unathorized' state={{from:location}} replace />
              : <Navigate to='/login' state={{from:location}} replace/>
  
  )
}

export default RequireAuth;
