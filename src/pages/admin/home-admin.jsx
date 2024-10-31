import React from "react";
import { Link } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { TbReportMoney } from "react-icons/tb";

export default function HomeAdmin() {
  return (
    <div>

      homeAdmin
      <div className="flex">

 
        <Link to="/admin/employee-management" 
        className="border rounded-xl bg-[#F3F8FF] p-4" 
        >
          <div className="flex flex-col items-center">
          <MdManageAccounts className="text-4xl" />
            <p className="text-center">Employee<br />Management</p>
          </div>
        </Link>
 
        <Link to="/admin/calendar-management"
        className="border rounded-xl bg-[#F3F8FF] p-4"
        >
          <div className="flex flex-col items-center">
          <LuCalendarClock className="text-4xl" />
            <p className="text-center">Calendar<br />Management</p>
          </div>
        </Link>

      </div>
      
      <div className="flex">

        <Link to="/admin/request-management"
        className="border rounded-xl bg-[#F3F8FF] p-4"
        >
          <div className="flex flex-col items-center">
          <VscGitPullRequestGoToChanges className="text-4xl" />
            <p className="text-center">Request<br />Management</p>
          </div>
        </Link>

        <Link to="/admin/payroll"
        className="border rounded-xl bg-[#F3F8FF] p-4"
        >
          <div className="flex flex-col items-center">
          <TbReportMoney className="text-4xl" />
            <p className="text-center">Payroll</p>
          </div>
        </Link>

      </div>

    </div>
  );
}
