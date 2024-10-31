import React from "react";
import { Link } from "react-router-dom";
// import useAuthStore from "../store/authStore";

export default function MainNav() {
  //   const user = useAuthStore((state) => state.user);

  return (
    <nav className="bg-white text-[#082777] h-14 shadow-lg">
        <div className="flex justify-end items-center px-4">

          <div>
            <Link
              to="/profile"
              className="flex items-center space-x-2 bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-300  transition duration-300"
            >
              <img
                src={"https://picsum.photos/200" || "default-avatar.png"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span>Name</span>
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
