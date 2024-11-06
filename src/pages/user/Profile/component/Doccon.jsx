import React from "react";
import { Link } from "react-router-dom";
import IconPaySlip from "./Icon/IconPaySlip";
const classLink =
    "flex flex-col border w-32 rounded-xl bg-[#F3F8FF] p-4 hover:bg-[#2453CA] hover:scale-105 hover:duration-200 active:bg-green-400 rounded-xl px-3 py-2 gap-2";

export default function Doccon() {
  return (
    <div className="w-full h-full ">
      <p className="text-4xl font-bold p-4">Document Request</p>
      <div className="flex flex-wrap justify-center px-4 gap-4 ">
        <Link to="/profile/doccon/payslip" className={classLink}>
          <IconPaySlip />
          <p className="text-center">
            PaySlip
            <br />
            Request
          </p>
        </Link>
      </div>
    </div>
  );
}
