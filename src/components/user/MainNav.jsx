import React, { useEffect, useState } from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authSrore";
import axios from "../../config/axios";
import { IoMdMenu } from "react-icons/io";

export default function MainNav() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const actionLogout = useAuthStore((state) => state.actionLogout);

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getUserInfo = async () => {
    try {
      const resp = await axios.get(`user/${user.id}`);
      setUserInfo(resp.data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const hdlLogout = () => {
    actionLogout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white text-[#082777] h-14 shadow-lg">
      <div className="flex justify-end items-center px-4 space-x-4">
        {/* User Profile Info */}
        <Link
          to="/user/profile"
          className="flex items-center space-x-2 bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
        >
          {loading ? (
            <div className="animate-pulse w-8 h-8 bg-gray-300 rounded-full" />
          ) : (
            <img
              src={
                userInfo.profileImg ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt={`${userInfo.firstName}'s Avatar`}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="font-medium">
            {loading ? "Loading..." : userInfo.firstName}
          </span>
        </Link>

        {/* Menu Icon Dropdown */}
        {user && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-[#082777] p-2 rounded-lg hover:bg-gray-200 transition duration-300"
            >
              <IoMdMenu className="text-2xl" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-48 bg-[#2c3e50] p-2 rounded-lg shadow-lg flex flex-col z-10">
                <NavLink
                  to="/reset-password"
                  className={({ isActive }) =>
                    `text-white hover:bg-[#2453CA] px-3 py-2 rounded font-medium ${
                      isActive ? "bg-[#2453CA]" : ""
                    }`
                  }
                >
                  Change Password
                </NavLink>
                <button
                  onClick={hdlLogout}
                  className="text-white hover:bg-[#2453CA] px-3 py-2 w-full text-left rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
