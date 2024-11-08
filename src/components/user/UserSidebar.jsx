import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
    "flex justify-center items-center hover:bg-[#2453CA] hover:scale-105 hover:duration-200 active:bg-green-400 rounded-xl px-3 py-2 gap-2 text-white";

  return (
    <div className="bg-[#082777] min-w-[200px] p-4 flex flex-col text-white shadow-lg rounded-lg">
      {/* Logo Section */}
      <div className="flex flex-col items-center gap-2 py-6">
        <div className="text-center">
          <p className="font-bold text-2xl text-[#f9f9f9]">MY CREW</p>
        </div>
      </div>

      {/* Menu Links */}
      <div className="flex-1 py-4 space-y-2">
        <Link className={classLink} to="/attendance">
          <div className="flex flex-col items-center">
            <FaLocationDot className="text-3xl mb-1 font-medium" />
            <p className="text-sm font-medium">Attendance</p>
          </div>
        </Link>

        <Link className={classLink} to="/profile">
          <div className="flex flex-col items-center">
            <CgProfile className="text-3xl mb-1" />
            <p className="text-sm font-medium">Profile</p>
          </div>
        </Link>

        <Link className={classLink} to="/calendar">
          <div className="flex flex-col items-center">
            <LuCalendarDays className="text-3xl mb-1" />
            <p className="text-sm font-medium">Calendar</p>
          </div>
        </Link>

        <Link className={classLink} to="/job">
          <div className="flex flex-col items-center">
            <GrWorkshop className="text-3xl mb-1" />
            <p className="text-sm font-medium">Job</p>
          </div>
        </Link>

        <Link className={classLink} to="/request">
          <div className="flex flex-col items-center">
            <FaFileCircleQuestion className="text-3xl mb-1" />
            <p className="text-sm font-medium">Request</p>
          </div>
        </Link>
      </div>

      {/* Admin Section (Conditional) */}
      {user?.role === "ADMIN" && (
        <Link className={classLink} to="/admin">
          <div className="flex flex-col items-center">
            <MdOutlineAdminPanelSettings className="text-3xl mb-1" />
            <p className="text-sm font-medium">Admin</p>
          </div>
        </Link>
      )}

      {user && (
        <div className="relative mt-4 group">
          <button className={`${classLink} w-full flex justify-between items-center`}>
            <span>User Options</span>
            <MdExpandMore className="text-lg" />
          </button>

          {/* Dropdown Content */}
          <div className="absolute top-[-70px] right-[-150px] w-45 bg-[#2c3e50] p-2 rounded-lg shadow-lg hidden group-hover:flex flex-col">
            <Link to="/reset-password" className="text-white hover:bg-[#2453CA] px-3 py-2 rounded font-medium">
              Change Password
            </Link>
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
