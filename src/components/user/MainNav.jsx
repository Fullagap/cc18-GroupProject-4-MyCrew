import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authSrore";
import axios from "../../config/axios";

export default function MainNav() {
  const user = useAuthStore((state) => state.user);

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
    <nav className="bg-white text-[#082777] h-14 shadow-lg">
      <div className="flex justify-end items-center px-4">
        <div>
          <Link
            to="/user/profile"
            className="flex items-center space-x-2 bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
          >
            {loading ? (
              <div className="animate-pulse w-8 h-8 bg-gray-300 rounded-full" />
            ) : (
              <img
                src={userInfo.profileImg || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt={`${userInfo.firstName}'s Avatar`}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="font-medium">
              {loading ? "Loading..." : userInfo.firstName}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="hover:text-yellow-400 transition duration-300">
      {children}
    </Link>
  );
}
