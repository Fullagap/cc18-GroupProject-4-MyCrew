import { Avatar, CircularProgress, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useRef } from "react";
import { updateProfileImage } from "../../../../api/admin";
import useAuthStore from "../../../../store/authSrore";

export default function Profile({ userInfo, getUserInfo }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const hdlUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", user.id);

    setIsLoading(true);

    try {
      const resp = await updateProfileImage(formData, token);
      console.log(resp);
      getUserInfo();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelection = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-2/4 rounded-3xl bg-[#F3F8FF]">
      <div className="justify-center flex mt-4 relative">
        <Box
          sx={{
            position: "relative",
            width: 220,
            height: 220,
            "&:hover .editIcon": { opacity: 1 }, // Show icon on hover
          }}
          onClick={handleFileSelection} // Use this as the single click handler
        >
          <Avatar
            alt="Profile"
            src={
              userInfo.profileImg ?? "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"
            }
            sx={{
              width: 220,
              height: 220,
              cursor: "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
          />

          {isLoading && (
            <CircularProgress
              size={50}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "primary.main",
              }}
            />
          )}

          <IconButton
            className="editIcon"
            sx={{
              position: "absolute",
              top: 10,
              right: 8,
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              opacity: 0,
              transition: "opacity 0.3s ease",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.8)" },
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </div>

      {/* Hidden file input that will be triggered by clicking the Avatar or IconButton */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={hdlUpload}
      />

      <div className="mt-2 mx-4">
        <div className="flex justify-center text-2xl underline">PROFILE</div>
        <div className="flex mt-2 text-lg">
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
