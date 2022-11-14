import { useAuth } from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import React, { FC } from 'react';

interface RequireAuthProps {
  admin?: boolean;
  children: JSX.Element;
}

const RequireAuth: FC<RequireAuthProps> = ({ children, admin }) => {
  const location = useLocation();
  const auth = useAuth();
  const token = localStorage.getItem('token');
  if (token) {
    auth.signinToken(token, () => {});
    return children;
  }

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (admin && !auth.user.isAdmin) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
