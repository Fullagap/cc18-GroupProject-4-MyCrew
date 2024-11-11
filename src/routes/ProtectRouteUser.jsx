import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { currentUser } from '../api/admin';
import useAuthStore from '../store/authSrore';
import LoadingToRedirect from './LoadingToRedirect';

function ProtectRouteUser({ element }) {
  const [isAllowed, setIsAllowed] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!user || !token) {
      setIsAllowed(false);
    } else {
      currentUser(token)
        .then(() => setIsAllowed(true))
        .catch(() => setIsAllowed(false));
    }
  }, [user, token]);

  if (!user || !token) {
    return <Navigate to="/" />; // Redirect to login page if not login
  }

  return isAllowed ? element : <LoadingToRedirect />;
}

export default ProtectRouteUser;
