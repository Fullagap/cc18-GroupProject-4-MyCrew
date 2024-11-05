import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { LuCalendarDays } from "react-icons/lu";
import { GrWorkshop } from "react-icons/gr";
import { FaFileCircleQuestion, FaLocationDot } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import useAuthStore from "../../stroes/authSrore";

// const user = useAuthStore((state) => state.user);

const UserSidebar = () => {

  const navigate = useNavigate();
  const actionLogout = useAuthStore((state) => state.actionLogout);
  const user = useAuthStore((state) => state.user)

  const hdlLogout = () => {
    actionLogout();
    navigate("/");
  }

  const classLink =
    "flex justify-center hover:bg-[#2453CA] hover:scale-105 hover:duration-200 active:bg-green-400 rounded-xl px-3 py-2 gap-2";

  return (
    <div className="bg-[#082777] min-w-44 p-4 flex flex-col text-white">
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="flex flex-col items-center text-xl">
          <p>Logo</p>
          <p>MY CREW</p>
        </div>
      </div>

      {/* Menu Link */}
      <div className="flex-1 py-4">
        <Link className={classLink} to="/attendance">
          <div className="flex flex-col items-center ">
            <FaLocationDot className="text-4xl" />
            <p>Attendance</p>
          </div>
        </Link>

        <Link className={classLink} to="/profile">
          <div className="flex flex-col items-center ">
            <CgProfile className="text-4xl" />
            <p>Profile</p>
          </div>
        </Link>

        <Link className={classLink} to="/calendar">
          <div className="flex flex-col items-center ">
            <LuCalendarDays className="text-4xl" />
            <p>Calendar</p>
          </div>
        </Link>

        <Link className={classLink} to="/job">
          <div className="flex flex-col items-center ">
            <GrWorkshop className="text-4xl" />
            <p>Job</p>
          </div>
        </Link>

        <Link className={classLink} to="/request">
          <div className="flex flex-col items-center ">
            <FaFileCircleQuestion className="text-4xl" />
            <p>Request</p>
          </div>
        </Link>
      </div>


      {/* Bottom Menu */}
      <div>
        {"ADMIN" === "ADMIN" && (
          <Link className={classLink} to="/admin">
            <div className="flex flex-col items-center">
              <MdOutlineAdminPanelSettings className="text-4xl" />
              <p>ADMIN</p>
            </div>
          </Link>
        )}

        {user && (
          <div>

            <Link to={"/request-change-password"} className={classLink}>
              <button  >
                Change Password
              </button>
            </Link>
            <button onClick={hdlLogout} className={classLink}>
              Logout
            </button>

          </div>

        )}

      </div>
    </div>
  );
};

export default UserSidebar;
