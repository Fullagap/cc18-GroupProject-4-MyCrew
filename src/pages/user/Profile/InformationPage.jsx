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
   
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      
      {/* Profile and Detail Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 bg-white rounded-3xl shadow-md p-6">
          <Profile userInfo={userInfo} getUserInfo={getUserInfo} />
        </div>
        <div className="lg:w-2/3 bg-white rounded-3xl shadow-md p-6">
          <Detail userInfo={userInfo} />
        </div>
      </div>
      
      {/* Footer Section */}
      <Footer className="w-full bg-white rounded-3xl shadow-md p-6" />
    </div>
  </div>
  );
}
