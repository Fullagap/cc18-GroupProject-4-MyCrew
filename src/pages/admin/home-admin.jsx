import React from "react";
import { Link } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { TbReportMoney } from "react-icons/tb";

export default function HomeAdmin() {
  const classLink =
    "flex flex-col border w-32 rounded-xl bg-[#F3F8FF] p-4 hover:bg-[#2453CA] hover:scale-105 hover:duration-200 active:bg-green-400 rounded-xl px-3 py-2 gap-2";

  return (
    <div>
      <p className="text-4xl font-bold p-4">Admin Management</p>
      <div className="flex px-4 gap-4">
        <Link to="/admin/employee-management" className={classLink}>
          <MdManageAccounts className="text-8xl" />
          <p className="text-center">
            Employee
            <br />
            Management
          </p>
        </Link>

        <Link to="/admin/calendar-management" className={classLink}>
          <LuCalendarClock className="text-8xl" />
          <p className="text-center">
            Calendar
            <br />
            Management
          </p>
        </Link>

        <Link to="/admin/request-management" className={classLink}>
          <VscGitPullRequestGoToChanges className="text-8xl" />
          <p className="text-center">
            Request
            <br />
            Management
          </p>
        </Link>

        <Link to="/admin/payroll" className={classLink}>
          <TbReportMoney className="text-8xl" />
          <p className="text-center">Payroll</p>
        </Link>

        <Link to="/admin/manageItem" className={classLink}>
          <p className="text-center">
            Item
            <br />
            Management
          </p>
        </Link>

      </div>
    </div>
  );
}
