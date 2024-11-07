import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "../pages/page-not-found";
import Unauthorized from "../pages/unauthorized";
import Login from "../pages/auth/login";
import Attendance from "../pages/user/attendance";
import Profile from "../pages/user/profile";
import Calendar from "../pages/user/calendar";
import Job from "../pages/user/job";
import Request from "../pages/user/request";
import RequestSth from "../pages/user/requestSth";
import RequestItem from "../pages/user/request/requestItem";
import UserLayout from "../layout/user-layout";
import HomeAdmin from "../pages/admin/home-admin";
import EmployeeManagement from "../pages/admin/employee/employee-management";
import CalendarManagement from "../pages/admin/calendar/calendar-management";
import RequestManagement from "../pages/user/request/request-management";
import RequestItemManage from "../pages/user/request/requestItemManage";
import Payroll from "../pages/admin/payroll/payroll";
import EditEmployee from "../pages/admin/employee/edit-employee";
import RequestChangePassword from "../pages/auth/RequestChangePassword";
import ChangePassword from "../pages/auth/Changepassword";
import PaySlipPage from "../pages/user/Profile/PaySlipPage";
import AllEmployees from "../pages/admin/employee/AllEmployees";
import DepartmentPosition from "../pages/admin/employee/DepartmentPosition";
import ManageItem from "../pages/admin/item/manageItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "request-change-password", element: <RequestChangePassword /> },
      { path: "change-password/:token", element: <ChangePassword /> },
      { path: "attendance", element: <Attendance /> },
      { path: "profile", element: <Profile info={true} /> },
      { path: "profile/leave-chart", element: <Profile chart={true} />},
      { path: "profile/req-status", element: <Profile req={true}/> },
      { path: "profile/doccon", element: <Profile dcc={true}/> },
      { path: "profile/doccon/payslip", element: <PaySlipPage /> },
      { path: "calendar", element: <Calendar /> },
      { path: "job", element: <Job /> },
      { path: "request-management", element: <RequestManagement /> },
      { path: "request", element: <Request /> },
      { path: "requestSth", element: <RequestSth /> },
      { path: "requestItem", element: <RequestItem /> },
      { path: "requestItemManage", element: <RequestItemManage /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <UserLayout />,
    children: [{ index: true, element: <HomeAdmin /> },
      { path: "employee-management", element: <EmployeeManagement/> },
      { path: "all-employee", element: <AllEmployees/> },
      { path: "calendar-management", element: <CalendarManagement/> },
      { path: "update-department", element: <DepartmentPosition/> },
      { path: "request-management", element: <RequestManagement/> },
      { path: "payroll", element: <Payroll/> },
      { path: "edit-employee", element: <EditEmployee/> },
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
