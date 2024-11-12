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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", user.id);

    setIsLoading(true);
    try {
      await updateProfileImage(formData, token);
      getUserInfo();
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-6 bg-[#F3F8FF] rounded-3xl shadow-md flex flex-col items-center mx-auto">
      <Box className="relative group flex items-center justify-center">
        <Avatar
          alt="Profile"
          src={userInfo.profileImg ?? "https://example.com/default-profile.png"}
          sx={{
            width: 160,
            height: 160,
            cursor: "pointer",
            opacity: isLoading ? 0.5 : 1,
          }}
        />
        {isLoading && (
          <CircularProgress
            size={48}
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
          className="absolute bottom-2 right-2 bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => fileInputRef.current.click()}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleUpload} />

      <div className="mt-4 text-center w-full">
        <h2 className="text-xl font-semibold underline mb-6 text-blue-900">PROFILE</h2>
        <div className="mt-2 text-lg space-y-2">
          <p><strong>Employee ID:</strong> {userInfo?.id ?? "N/A"}</p>
          <p><strong>Department:</strong> {userInfo?.Department?.departmentName ?? "N/A"}</p>
          <p><strong>Position:</strong> {userInfo?.position?.positionName ?? "N/A"}</p>
          <p><strong>Supervisor:</strong> {userInfo?.supId ?? "-"}</p>
        </div>
      </div>
    </div>
  );
}
