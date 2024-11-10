import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "../pages/page-not-found";
import Unauthorized from "../pages/unauthorized";
import Login from "../pages/auth/login";
import Attendance from "../pages/user/attendance";
import Profile from "../pages/user/profile";
import Calendar from "../pages/user/calendar";
import Job from "../pages/user/job";
import Request from "../pages/user/request";
import UserLayout from "../layout/user-layout";
import HomeAdmin from "../pages/admin/home-admin";
import EmployeeManagement from "../pages/admin/employee/employee-management";
import CalendarManagement from "../pages/admin/calendar/calendar-management";
import RequestManagement from "../pages/admin/request/request-management";
import Payroll from "../pages/admin/payroll/payroll";
import EditEmployee from "../pages/admin/employee/edit-employee";
import RequestChangePassword from "../pages/auth/RequestChangePassword";
import ChangePassword from "../pages/auth/Changepassword";
import PaySlipPage from "../pages/user/Profile/PaySlipPage";
import AllEmployees from "../pages/admin/employee/AllEmployees";
import DepartmentPosition from "../pages/admin/employee/DepartmentPosition";
import AttendanceManagement from "../pages/admin/attendance/attendance-management";
import ResetPassword from "../pages/auth/ResetPassword";
import AttendanceDashboard from "../pages/user/attendanceDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "request-change-password", element: <RequestChangePassword /> },
      { path: "change-password/:token", element: <ChangePassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "attendance", element: <Attendance /> },
      { path: "profile", element: <Profile info={true} /> },
      { path: "profile/leave-chart", element: <Profile chart={true} /> },
      { path: "profile/req-status", element: <Profile req={true} /> },
      { path: "profile/doccon", element: <Profile dcc={true} /> },
      { path: "profile/doccon/payslip", element: <PaySlipPage /> },
      { path: "calendar", element: <Calendar /> },
      { path: "job", element: <Job /> },
      { path: "request", element: <Request /> },
      { path: "attendance/dashboard", element: <AttendanceDashboard /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomeAdmin /> },
      { path: "employee-management", element: <EmployeeManagement /> },
      { path: "all-employee", element: <AllEmployees /> },
      { path: "calendar-management", element: <CalendarManagement /> },
      { path: "update-department", element: <DepartmentPosition /> },
      { path: "request-management", element: <RequestManagement /> },
      { path: "payroll", element: <Payroll /> },
      { path: "edit-employee", element: <EditEmployee /> },
      { path: "attendance-management", element: <AttendanceManagement /> },
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
