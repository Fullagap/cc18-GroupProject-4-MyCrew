import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { LuCalendarDays } from "react-icons/lu";
import { GrWorkshop } from "react-icons/gr";
import { FaFileCircleQuestion, FaLocationDot } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings, MdExpandMore } from "react-icons/md";
import useAuthStore from "../../store/authSrore";

const UserSidebar = () => {
  const navigate = useNavigate();
  const actionLogout = useAuthStore((state) => state.actionLogout);
  const user = useAuthStore((state) => state.user);

  const hdlLogout = () => {
    actionLogout();
    navigate("/");
  };

  const classLink = 
    "flex justify-center items-center px-3 py-2 gap-2 text-white rounded-xl hover:bg-[#2453CA] hover:scale-105 transition duration-200";

  const activeClass = "bg-[#2453CA] scale-105"; //the active link styles

  return (
    <div className="bg-[#082777] min-w-[200px] p-4 flex flex-col text-white shadow-lg rounded-lg">
   
      <div className="flex flex-col items-center gap-2 py-6">
        <div className="text-center">
          <p className="font-bold text-2xl text-[#f9f9f9]">MY CREW</p>
        </div>
      </div>

    
      <div className="flex-1 py-4 space-y-2">
        <NavLink
          to="/user/attendance"
          className={({ isActive }) =>
            `${classLink} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex flex-col items-center">
            <FaLocationDot className="text-3xl mb-1 font-medium" />
            <p className="text-sm font-medium">Attendance</p>
          </div>
        </NavLink>

        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `${classLink} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex flex-col items-center">
            <CgProfile className="text-3xl mb-1" />
            <p className="text-sm font-medium">Profile</p>
          </div>
        </NavLink>

        <NavLink
          to="/user/calendar"
          className={({ isActive }) =>
            `${classLink} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex flex-col items-center">
            <LuCalendarDays className="text-3xl mb-1" />
            <p className="text-sm font-medium">Calendar</p>
          </div>
        </NavLink>

        <NavLink
          to="/user/job"
          className={({ isActive }) =>
            `${classLink} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex flex-col items-center">
            <GrWorkshop className="text-3xl mb-1" />
            <p className="text-sm font-medium">Job</p>
          </div>
        </NavLink>

        <NavLink
          to="/user/request-management"
          className={({ isActive }) =>
            `${classLink} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex flex-col items-center">
            <FaFileCircleQuestion className="text-3xl mb-1" />
            <p className="text-sm font-medium">Request</p>
          </div>
        </NavLink>
      </div>

      {user?.role === "ADMIN" && (
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${classLink} ${isActive ? activeClass : ""}`
          }
        >
          <div className="flex flex-col items-center">
            <MdOutlineAdminPanelSettings className="text-3xl mb-1" />
            <p className="text-sm font-medium">Admin</p>
          </div>
        </NavLink>
      )}

      {user && (
        <div className="relative mt-4 group">
          <button className={`${classLink} w-full flex justify-between items-center`}>
            <span>User Options</span>
            <MdExpandMore className="text-lg" />
          </button>

          <div className="absolute top-[-70px] right-[-150px] w-45 bg-[#2c3e50] p-2 rounded-lg shadow-lg hidden group-hover:flex flex-col">
            <NavLink
              to="/reset-password"
              className={({ isActive }) =>
                `text-white hover:bg-[#2453CA] px-3 py-2 rounded font-medium ${isActive ? activeClass : ""}`
              }
            >
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
