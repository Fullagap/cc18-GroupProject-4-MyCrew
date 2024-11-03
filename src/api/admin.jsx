import axios from "../config/axios"

export const register = (form)=> axios.post('/admin/register',form)
export const department =()=> axios.get('/admin/department')
export const positionDepartment =(id)=> axios.get(`/admin/department-position/${id}`)
export const EmployeeInDepartment =(id)=> axios.get(`/admin/department-employees/${id}`)
export const allEmployees =()=> axios.get(`/admin/All-employees`)
export const editEmployeesInfo =(id,form)=> axios.patch(`/admin/update-user/${id}`,form)
