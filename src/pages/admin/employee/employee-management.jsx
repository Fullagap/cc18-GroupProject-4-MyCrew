import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPeople } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import adminStore from '../../../store/admin-store';

function EmployeeManagement() {
  const navigate = useNavigate();

  const hdlEditClick = () => {
    navigate("/admin/edit-employee");
  };

  const hdlAllEmployees = () => {
    navigate("/admin/all-employee");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex flex-col md:flex-row h-96">
        <div className="flex-1 flex flex-col items-center justify-center p-4 border-r border-gray-200 hover:scale-105">
        <FaRegEdit className="text-6xl mb-4" />
          <h2 className="text-3xl font-bold mb-4">Register New Employee</h2>
         
          <button 
            onClick={hdlEditClick} 
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            New register
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4 hover:scale-105">

          <BsPeople className="text-6xl mb-4" />

          <h2 className="text-3xl font-bold mb-4">View All Employees</h2>
          <button 
            onClick={hdlAllEmployees} 
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            All Employees
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
