import { Avatar } from "@mui/material";
import React, { useState, useRef } from "react";
import { updateProfileImage } from "../../../../api/admin";
import useAuthStore from "../../../../store/authSrore";

export default function Profile({ userInfo, getUserInfo }) {
  console.log(userInfo);

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const [image, setImage] = useState({ id: user.id, photo: "" });
  const formData = new FormData();

  // Create a reference for the file input
  const fileInputRef = useRef(null);

  const hdlUpload = async (e) => {
    const file = e.target.files[0];
    formData.append("file", file);
    formData.append("id", user.id);

    try {
      const resp = await updateProfileImage(formData, token);
      console.log(resp);
      getUserInfo();
    } catch (err) {
      console.log(err);
    }
  };


  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-1/3 rounded-3xl bg-[#F3F8FF]">
      <div className="justify-center flex mt-4">
        <Avatar
          alt="Profile"
          src={
            userInfo.profileImg ??
            "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"
          }
          sx={{ width: 220, height: 220, cursor: "pointer" }}
          onClick={handleAvatarClick} 
        />
      </div>
      
      {/* Hidden file input that will be triggered by clicking the Avatar */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={hdlUpload}
      />
      <div className="mt-2 mx-4">
        <div className="flex justify-center text-4xl underline">PROFILE</div>
        <div className="flex mt-2 text-xl">
          <div className="w-1/3">
            <h3>Employee ID</h3>
            <h3>Department</h3>
            <h3>Position</h3>
            <h3>Supervisor</h3>
          </div>
          <div className="w-2/3">
            <h3>: {userInfo?.id}</h3>
            <h3>: {userInfo?.Department?.departmentName}</h3>
            <h3>: {userInfo?.position?.positionName}</h3>
            <h3>: {userInfo?.supId ?? "employee"}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
