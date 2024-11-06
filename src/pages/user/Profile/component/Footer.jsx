import React from "react";
import IconInfo from "./Icon/IconInfo";
import IconLeave from "./Icon/IconLeave";
import IconCalendar from "./Icon/IconCalendar";
import IconSlip from "./Icon/IconSlip";
import { Link } from "react-router-dom";

export default function Footer(props) {
  const { info } = props;

  return (
    <div className="flex  h-1/4 items-center justify-between ">
      
      <div className="w-1/4 border-4 h-full mx-4 my-4 rounded-3xl bg-[#F3F8FF] hover:underline cursor-pointer flex justify-center items-center text-4xl">
        <Link className="flex justify-center items-center" to="/profile">
          <IconInfo className="w-[60px]" />
          <p>Information.</p>
        </Link>
      </div>
      <div className="w-1/4 border-4 h-full mx-4 my-4 rounded-3xl bg-[#F3F8FF] hover:underline cursor-pointer flex justify-center items-center text-4xl">
        <Link className="flex justify-center items-center" to="/profile/leave-chart">
          <IconLeave className="w-[70px]" />
          <p>Leave</p>
        </Link>
      </div>
      <div className="w-1/4 border-4 h-full mx-4 my-4 rounded-3xl bg-[#F3F8FF] hover:underline cursor-pointer flex justify-center items-center text-4xl">
        <Link className="flex justify-center items-center" to="/profile/req-status">
          <IconCalendar className="w-[50px]" />
          <p> Req. Status</p>
        </Link>
      </div>
      <div className="w-1/4 border-4 h-full mx-4 my-4 rounded-3xl bg-[#F3F8FF] hover:underline cursor-pointer flex justify-center items-center text-4xl">
        <Link className="flex justify-center items-center" to="/profile/doccon">
          <IconSlip className="w-[60px]" />
          <p>Doccon.</p>
        </Link>
      </div>
    </div>
  );
}
