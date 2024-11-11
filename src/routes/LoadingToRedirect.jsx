import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function LoadingToRedirect() {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to="/user/profile" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <AiOutlineLoading3Quarters className="text-5xl text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Permission</h2>
        <p className="text-gray-600 mb-4">Redirecting in {count} seconds...</p>
        <p className="text-sm text-gray-500">Please wait while we take you to the Home page.</p>
      </div>
    </div>
  );
}

export default LoadingToRedirect;
