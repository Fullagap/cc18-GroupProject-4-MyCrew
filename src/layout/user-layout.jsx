import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import MainNav from "../components/user/MainNav";

const UserLayout = () => {
  return (
    <div
      className="flex bg-neutral-100 h-screen
      w-screen overflow-hidden"
    >
      <UserSidebar/>
      <div className="flex flex-col flex-1">
        <MainNav/>
        <div className="flex-1 p-2 min-h-0 overflow-auto bg-[#E5EDF9]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
