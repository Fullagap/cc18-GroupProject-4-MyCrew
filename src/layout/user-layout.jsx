import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import MainNav from "../components/user/MainNav";
import useAuthStore from "../store/authSrore";

const UserLayout = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="relative flex bg-neutral-100 h-screen w-screen">
      {/* Sidebar for desktop */}
      {user && (
        <div className="hidden md:block">
          <UserSidebar />
        </div>
      )}
      
      <div className="flex flex-col flex-1 h-full">
        {user && <MainNav />}
        
        {/* Outlet container with responsive scrolling */}
        <div className="flex-1 p-2 overflow-y-auto bg-[#E5EDF9]">
          <Outlet />
        </div>
      </div>
      
      {/* Sidebar for mobile */}
      {user && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <UserSidebar />
        </div>
      )}
    </div>
  );
};

export default UserLayout;
