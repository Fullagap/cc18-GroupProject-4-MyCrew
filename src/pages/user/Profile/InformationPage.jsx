import React, { useEffect, useState } from 'react'
import Profile from './component/Profile'
import Detail from './component/Detail'
import Footer from './component/Footer'
import useAuthStore from '../../../store/authSrore';
import axios from "../../../config/axios";

export default function Information() {
  const user = useAuthStore((state) => state.user);
  const [userInfo, setUserInfo] =useState({})

  const getUserInfo = async()=>{
    const resp = await axios.get(`user/${user.id}`);
    console.log(resp.data);
    setUserInfo(resp.data)
  }
  useEffect(()=>{
    getUserInfo()
  },[])
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-3/4 gap-8 mx-4 my-4">
        <Profile userInfo={userInfo} getUserInfo={getUserInfo} />
        <Detail userInfo={userInfo}/>
        
      </div>
        <Footer />
    </div>
  )
}
