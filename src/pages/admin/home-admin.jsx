import React from "react";
import { Link } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { TbReportMoney } from "react-icons/tb";
import { FaMapLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";  // Import motion from Framer Motion

export default function HomeAdmin() {
  const classLink =
    "group flex flex-col w-[250px] h-[150px] border w-32 rounded-xl bg-[#F3F8FF] p-4 hover:bg-[#082777] hover:text-white hover:scale-105 hover:duration-200 active:bg-green-400 rounded-xl px-3 py-2 gap-2";

  return (
    <div className="min-h-screen bg-[#E5EDF9] p-8">
      <p className="text-4xl font-bold mb-8 text-gray-800">Admin Management</p>
      <div className="flex flex-wrap gap-20 p-10">
        <motion.div
          className={classLink}
          whileHover={{ scale: 1.05 }}  // Scale the item on hover
          whileTap={{ scale: 0.95 }}    // Slightly shrink on click
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/admin/employee-management" className="flex flex-col w-full h-full">
            <MdManageAccounts className="text-6xl text-blue-600 group-hover:text-white" />
            <p className="text-center text-lg font-semibold">Employee Management</p>
          </Link>
        </motion.div>

        <motion.div
          className={classLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/admin/calendar-management" className="flex flex-col w-full h-full">
            <LuCalendarClock className="text-6xl text-blue-600 group-hover:text-white" />
            <p className="text-center text-lg font-semibold">Calendar Management</p>
          </Link>
        </motion.div>

        <motion.div
          className={classLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/admin/manageItem" className="flex flex-col w-full h-full">
            <VscGitPullRequestGoToChanges className="text-6xl text-blue-600 group-hover:text-white" />
            <p className="text-center text-lg font-semibold">Item Management</p>
          </Link>
        </motion.div>

        <motion.div
          className={classLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/admin/payroll" className="flex flex-col w-full h-full">
            <TbReportMoney className="text-6xl text-blue-600 group-hover:text-white" />
            <p className="text-center text-lg font-semibold">Payroll</p>
          </Link>
        </motion.div>

        <motion.div
          className={classLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/admin/attendance-management" className="flex flex-col w-full h-full">
            <FaMapLocationDot className="text-6xl text-blue-600 group-hover:text-white" />
            <p className="text-center text-lg font-semibold">
              Attendance
              <br />
              Management
            </p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
