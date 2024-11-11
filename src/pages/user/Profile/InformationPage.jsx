import React, { useEffect, useState } from "react";
import Profile from "./component/Profile";
import Detail from "./component/Detail";
import Footer from "./component/Footer";
import useAuthStore from "../../../store/authSrore";
import axios from "../../../config/axios";

export default function Information() {
  const user = useAuthStore((state) => state.user);
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    try {
      const resp = await axios.get(`user/${user.id}`);
      setUserInfo(resp.data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 rounded-md">
      <div className="flex flex-col lg:flex-row flex-grow gap-4 lg:gap-8 p-4">
        {/* Profile and Detail sections */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <Profile userInfo={userInfo} getUserInfo={getUserInfo} className="lg:w-1/3" />
          <Detail userInfo={userInfo} className="lg:w-2/3" />
        </div>
      </div>
      {/* Footer section */}
      <Footer className="mt-auto p-4" />
    </div>
  );
}
