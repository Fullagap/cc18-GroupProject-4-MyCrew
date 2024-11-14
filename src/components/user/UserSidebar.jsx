import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { LuCalendarDays } from "react-icons/lu";
import { FaSitemap } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { FaFileCircleQuestion, FaLocationDot } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings, MdExpandMore } from "react-icons/md";
import useAuthStore from "../../store/authSrore";
import userStore from "../../store/user-store";

const UserSidebar = () => {
  const navigate = useNavigate();
  const actionLogout = useAuthStore((state) => state.actionLogout);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const { getSupData } = userStore();
  const [supData, setSupData] = useState([]);

  const fetchSupData = async () => {
    try {
      const result = await getSupData(token);
      setSupData(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSupData();
  }, []);

  const hdlLogout = () => {
    actionLogout();
    navigate("/");
  };

  const classLink = "flex justify-center items-center px-3 py-2 gap-2 text-white rounded-xl hover:bg-[#2453CA] hover:scale-105 transition duration-200";
  const activeClass = "bg-[#2453CA] scale-105";

  return (
    <div className="bg-[#082777] md:p-4 p-2 flex md:flex-col text-white shadow-lg md:rounded-lg md:min-h-screen">
      <div className="hidden md:flex flex-col items-center gap-2 py-6">
        <NavLink to='/user/profile'  className="font-bold text-2xl text-[#f9f9f9]">MY CREW</NavLink>
      </div>

      <div className="flex md:flex-col flex-row justify-around md:justify-start md:py-4 md:space-y-2 md:space-x-0 space-x-2 flex-1">
        <NavLink to="/user/attendance" className={({ isActive }) => `${classLink} ${isActive ? activeClass : ""}`}>
          <div className="flex flex-col items-center">
            <FaLocationDot className="text-2xl md:text-3xl md:mb-1" />
            <p className="text-[10px] md:text-sm font-medium md:block">Attendance</p>
          </div>
        </NavLink>

        {supData && (
          <NavLink to="/user/attendance-dashboard" className={({ isActive }) => `${classLink} ${isActive ? activeClass : ""}`}>
            <div className="flex flex-col items-center">
              <FaSitemap className="text-2xl md:text-3xl md:mb-1" />
              <p className="text-[10px] md:text-sm font-medium md:block">Dashboard</p>
            </div>
          </NavLink>
        )}

        <NavLink to="/user/calendar" className={({ isActive }) => `${classLink} ${isActive ? activeClass : ""}`}>
          <div className="flex flex-col items-center">
            <LuCalendarDays className="text-2xl md:text-3xl md:mb-1" />
            <p className="text-[10px] md:text-sm font-medium md:block">Calendar</p>
          </div>
        </NavLink>

        <NavLink to="/user/job" className={({ isActive }) => `${classLink} ${isActive ? activeClass : ""}`}>
          <div className="flex flex-col items-center">
            <GrWorkshop className="text-2xl md:text-3xl md:mb-1" />
            <p className="text-[10px] md:text-sm font-medium md:block">Job</p>
          </div>
        </NavLink>

        <NavLink to="/user/request-management" className={({ isActive }) => `${classLink} ${isActive ? activeClass : ""}`}>
          <div className="flex flex-col items-center">
            <FaFileCircleQuestion className="text-2xl md:text-3xl md:mb-1" />
            <p className="text-[10px] md:text-sm font-medium md:block">Request</p>
          </div>
        </NavLink>

        {user?.role === "ADMIN" && (
          <NavLink to="/admin" className={({ isActive }) => `${classLink} ${isActive ? activeClass : ""}`}>
            <div className="flex flex-col items-center">
              <MdOutlineAdminPanelSettings className="text-2xl md:text-3xl md:mb-1" />
              <p className="text-[10px] md:text-sm font-medium md:block">Admin</p>
            </div>
          </NavLink>
        )}
      </div>

      {user && (
        <div className="hidden md:block relative mt-4 group">
          <button className={`${classLink} w-full flex justify-between items-center`}>
            <span className="hidden md:block">User Options</span>
            <MdExpandMore className="text-lg" />
          </button>

          <div className="absolute top-[-70px] right-[-150px] w-45 bg-[#2c3e50] p-2 rounded-lg shadow-lg hidden group-hover:flex flex-col z-10">
            <NavLink to="/reset-password" className={({ isActive }) => `text-white hover:bg-[#2453CA] px-3 py-2 rounded font-medium ${isActive ? activeClass : ""}`}>
              Change Password
            </NavLink>
            <button onClick={hdlLogout} className="text-white hover:bg-[#2453CA] px-3 py-2 w-full text-left rounded">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSidebar;