import { Avatar } from "@mui/material";
import React from "react";

export default function Profile() {
  return (
    <div className="w-1/3 rounded-3xl bg-[#F3F8FF]">
      <div className="justify-center flex mt-4">
        <Avatar
          alt="Profile"
          src="https://media.4-paws.org/c/1/7/8/c178dd618346079f9b96edeacc30563b8de72fb4/Molly_006-2829x1886-2726x1886-1920x1328.webp"
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
            <h3>: XX</h3>
            <h3>: XX</h3>
            <h3>: XX</h3>
            <h3>: XX</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
