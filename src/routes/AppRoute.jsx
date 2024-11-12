import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "../pages/page-not-found";
import Unauthorized from "../pages/unauthorized";
import Login from "../pages/auth/login";
import Attendance from "../pages/user/attendance";
import Profile from "../pages/user/profile";

import Job from "../pages/user/job";
import Request from "../pages/user/request";
import RequestSth from "../pages/user/requestSth";
import RequestItem from "../pages/user/request/requestItem";
import CreateItem from "../pages/user/request/createItem";
import ManageItem from "../pages/admin/item/manageItem";
import UserLayout from "../layout/user-layout";
import HomeAdmin from "../pages/admin/home-admin";
import EmployeeManagement from "../pages/admin/employee/employee-management";
import CalendarManagement from "../pages/admin/calendar-page-admin/calendar-management";
import RequestManagement from "../pages/user/request/request-management";
import RequestItemManage from "../pages/user/request/requestItemManage";
import Payroll from "../pages/admin/payroll/payroll";
import EditEmployee from "../pages/admin/employee/edit-employee";
import RequestChangePassword from "../pages/auth/RequestChangePassword";
import ChangePassword from "../pages/auth/Changepassword";
import LeaveRecord from "../pages/user/leave-record";
import PaySlipPage from "../pages/user/Profile/PaySlipPage";
import AllEmployees from "../pages/admin/employee/AllEmployees";
import DepartmentPosition from "../pages/admin/employee/DepartmentPosition";
import Calendar from "../pages/user/clendar-page-user/calendar";
import AttendanceManagement from "../pages/admin/attendance/attendance-management";
import ResetPassword from "../pages/auth/ResetPassword";
import AttendanceDashboard from "../pages/user/attendanceDashboard";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/reset-password", 
    element: <ResetPassword />,
  },
  {
    path: "/change-password/:token", 
    element: <ChangePassword/>,
  },
  {
    path: "/request-change-password", 
    element: <RequestChangePassword/>,
  },

  {
    path: "/user",
    element: <ProtectRouteUser element={<UserLayout />} />,
    children: [
      { path: "attendance", element: <Attendance /> },
      { path: "profile", element: <Profile info={true} /> },
      { path: "profile/leave-chart", element: <Profile chart={true} /> },
      { path: "profile/req-status", element: <Profile req={true} /> },
      { path: "profile/doccon", element: <Profile dcc={true} /> },
      { path: "profile/doccon/payslip", element: <PaySlipPage /> },
      { path: "calendar", element: <Calendar /> },
      { path: "calendar/leave-record", element: <LeaveRecord/> },
      { path: "job", element: <Job /> },
      { path: "request-management", element: <RequestManagement /> },
      { path: "request", element: <Request /> },
      { path: "attendance-dashboard", element: <AttendanceDashboard /> },
      { path: "requestSth", element: <RequestSth /> },
      { path: "requestItem", element: <RequestItem /> },
      { path: "createItem", element: <CreateItem /> },
      { path: "requestItemManage", element: <RequestItemManage /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<UserLayout/>}/>,
    children: [
      { index: true, element: <HomeAdmin /> },
      { path: "employee-management", element: <EmployeeManagement/> },
      { path: "all-employee", element: <AllEmployees/> },
      { path: "calendar-management", element: <CalendarManagement/> },
      { path: "update-department", element: <DepartmentPosition/> },
      { path: "request-management", element: <RequestManagement/> },
      { path: "payroll", element: <Payroll/> },
      { path: "edit-employee", element: <EditEmployee/> },
      { path: "attendance-management", element: <AttendanceManagement /> },
      { path: "manageItem", element: <ManageItem/> },
    ],
  },
]);

function AppRoute() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default AppRoute;
