import React from "react";
import IconInfo from "./Icon/IconInfo";
import IconLeave from "./Icon/IconLeave";
import IconCalendar from "./Icon/IconCalendar";
import IconSlip from "./Icon/IconSlip";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-wrap justify-around md:justify-between items-center gap-4 p-4 pb-6">
      {[
        { to: "/user/profile", icon: <IconInfo className="w-10" />, label: "Information" },
        { to: "/user/profile/leave-chart", icon: <IconLeave className="w-10" />, label: "Leave" },
        { to: "/user/profile/req-status", icon: <IconCalendar className="w-10" />, label: "Req. Status" },
        { to: "/user/profile/doccon", icon: <IconSlip className="w-10" />, label: "Doccon" },
      ].map(({ to, icon, label }, index) => (
        <Link
          key={index}
          to={to}
          className="w-full max-w-[140px] flex-grow border-2 rounded-3xl bg-[#F3F8FF] hover:underline cursor-pointer flex flex-col items-center justify-center py-4 px-2 transition duration-300 shadow-md hover:bg-blue-100"
        >
          {icon}
          <p className="mt-2 text-lg font-semibold">{label}</p>
        </Link>
      ))}
    </div>
  );
}
