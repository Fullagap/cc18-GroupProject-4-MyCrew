import { Avatar } from "@mui/material";
import React from "react";

export default function Profile({userInfo}) {
  console.log(userInfo)
  return (
    <div className="w-1/3 rounded-3xl bg-[#F3F8FF]">
      <div className="justify-center flex mt-4">
        <Avatar
          alt="Profile"
          src={userInfo.profileImg??"https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"}
          sx={{ width: 220, height: 220 }}
        />
      </div>
      <div className="mt-2 mx-4">
        <div className="flex  justify-center text-4xl underline">
          PROFILE
        </div>
        <div className="flex mt-2 text-xl">
          <div className="w-1/3">
            <h3>Employee ID  </h3>
            <h3>Department   </h3>
            <h3>Position     </h3>
            <h3>SuperVisor   </h3>
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
