import React from "react";
import IconInfo from "./Icon/IconInfo";
import IconLeave from "./Icon/IconLeave";
import IconCalendar from "./Icon/IconCalendar";
import IconSlip from "./Icon/IconSlip";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerItems = [
    { to: "/user/profile", icon: <IconInfo className="w-10" />, label: "Information", description: "Personal details" },
    { to: "/user/profile/leave-chart", icon: <IconLeave className="w-10" />, label: "Leave", description: "Leave of absence and leave history" },
    { to: "/user/profile/req-status", icon: <IconCalendar className="w-10" />, label: "Req. Status", description: "Approval status" },
    { to: "/user/profile/doccon", icon: <IconSlip className="w-10" />, label: "Documents", description: "Various supporting documents" },
  ];

  return (
    <div className="flex justify-center p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl p-6 bg-gray-50 rounded-lg shadow-md">
        {footerItems.map(({ to, icon, label, description }, index) => (
          <Link
            key={index}
            to={to}
            className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm transition duration-300 hover:bg-blue-100"
          >
            {icon}
            <div>
              <p className="text-lg font-semibold">{label}</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>


  );
}
