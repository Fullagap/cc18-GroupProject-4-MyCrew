import React from "react";
import { useNavigate } from "react-router-dom";

export default function RequestManagement() {
  const navigate = useNavigate();

  const hdlLeaveRecordClick = () => {
    navigate("/user/request");
  };

  const hdlRequestItemClick = () => {
    navigate("/user/requestItemManage");
  };

  const hdlNewRequestClick = () => {
    navigate("/user/requestSth");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl flex flex-col md:flex-row h-96 ">
        {/* Left Column */}
        <div className="flex flex-col items-center justify-center p-5 border-r border-gray-200 transform transition-transform duration-300 hover:scale-105 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Leave Record Management
          </h2>
          <button
            className="bg-[#082777] text-white hover:bg-blue-700 py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={hdlLeaveRecordClick}
          >
            All Requests
          </button>
        </div>

        {/* Middle Column */}
        <div className="flex-1 flex flex-col items-center justify-center border-r p-4 hover:scale-105">
          <h2 className="text-3xl font-bold mb-4">Item Management</h2>
          <button
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={hdlRequestItemClick}
          >
            All Requests
          </button>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 hover:scale-105">
          <h2 className="text-3xl font-bold mb-4">Request Item</h2>
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
