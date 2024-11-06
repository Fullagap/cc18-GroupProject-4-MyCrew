import React from "react";
import { Link } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { TbReportMoney } from "react-icons/tb";
import { FaMapLocationDot } from "react-icons/fa6";

export default function HomeAdmin() {
  const classLink =
    "group flex flex-col w-[250px] h-[150px] border w-32 rounded-xl bg-[#F3F8FF] p-4 hover:bg-[#082777] hover:text-white hover:scale-105 hover:duration-200 active:bg-green-400 rounded-xl px-3 py-2 gap-2";

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <p className="text-4xl font-bold mb-8 text-gray-800">Admin Management</p>
      <div className="flex flex-wrap gap-20 p-10">
        <Link to="/admin/employee-management" className={classLink}>
          <MdManageAccounts className="text-6xl text-blue-600 group-hover:text-white" />
          <p className="text-center text-lg font-semibold">Employee Management</p>
        </Link>

        <Link to="/admin/calendar-management" className={classLink}>
          <LuCalendarClock className="text-6xl text-blue-600 group-hover:text-white" />
          <p className="text-center text-lg font-semibold">Calendar Management</p>
        </Link>

        <Link to="/admin/request-management" className={classLink}>
          <VscGitPullRequestGoToChanges className="text-6xl text-blue-600 group-hover:text-white" />
          <p className="text-center text-lg font-semibold">Request Management</p>
        </Link>

        <Link to="/admin/payroll" className={classLink}>
          <TbReportMoney className="text-6xl text-blue-600 group-hover:text-white" />
          <p className="text-center text-lg font-semibold">Payroll</p>
        </Link>

        <Link to="/admin/attendance-management" className={classLink}>
          <FaMapLocationDot  className="text-6xl  text-blue-600 group-hover:text-white" />
          <p className="text-center">
            Attendance
            <br />
            Management
          </p>
        </Link>
      </div>
    </div>
  );
}
