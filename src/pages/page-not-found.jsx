import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gray-100 text-gray-800 p-6">
      <div className="text-9xl font-bold text-blue-600 animate-pulse">404</div>
      <h1 className="mt-4 text-3xl md:text-4xl font-semibold">Page Not Found</h1>
      <p className="mt-2 text-lg md:text-xl text-gray-600">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/user/profile"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-500 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
