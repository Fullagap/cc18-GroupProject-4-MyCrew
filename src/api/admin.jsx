import axios from "../config/axios";

export const register = (form, token) =>
  axios.post("/admin/register", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const department = (token) =>
  axios.get("/admin/department", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const positionDepartment = (id, token) =>
  axios.get(`/admin/department-position/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const EmployeeInDepartment = (id, token) =>
  axios.get(`/admin/department-employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const allEmployees = (token) =>
  axios.get(`/admin/All-employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const editEmployeesInfo = (id, form, token) =>
  axios.patch(`/admin/update-user/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const allLeader = (token) =>
  axios.get("/admin/leader", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const createDepartment = (input, token) =>
  axios.post(`/admin/create-department`, input, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const createPosition = (positionInput, token) =>
  axios.post(`/admin/create-position`, positionInput, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createOfficeSiteLocation = (form,token) =>
  axios.post("/admin/site-register", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
})

export const updateProfileImage =(form,token)=> axios.patch(`/admin/update-profile`,form,{
    headers: {
        Authorization: `Bearer ${token}`
    }
})

