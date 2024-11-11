import React, { useEffect, useState } from 'react';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../api/admin';
import useAuthStore from '../store/authSrore';

function ProtectRouteAdmin({ element }) {
  const [isAllowed, setIsAllowed] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      currentAdmin(token)
        .then(() => setIsAllowed(true))
        .catch(() => setIsAllowed(false));
    } else {
      setIsAllowed(false); // No user or token, no access
    }
  }, [user, token])

  return isAllowed ? element : <LoadingToRedirect />;
}

export default ProtectRouteAdmin;
