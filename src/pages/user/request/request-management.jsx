import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RequestManagement() {

  const navigate = useNavigate();

  const hdlLeaveRecordClick = () => {
    navigate("/request");
  }

  const hdlRequestItemClick = () => {
    navigate("/requestItemManage");
  }

  const hdlNewRequestClick = () => {
    navigate("/requestSth");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl flex flex-col md:flex-row h-96">
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 border-r border-gray-200 hover:scale-105">
          <h2 className="text-3xl font-bold mb-4">Request Leave records</h2>
          <button 
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={hdlLeaveRecordClick}
          >
            All Request
          </button>
        </div>

        {/* Middle Column */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 hover:scale-105">
          <h2 className="text-3xl font-bold mb-4">Request Items</h2>
          <button 
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={hdlRequestItemClick}
          >
            All Request
          </button>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 hover:scale-105">
          <h2 className="text-3xl font-bold mb-4">New Request</h2>
          <button 
            className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-300"
            onClick={hdlNewRequestClick}
          >
            Create Request
          </button>
        </div>
      </div>
    </div>
  );
}
