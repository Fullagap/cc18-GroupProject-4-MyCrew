import axios from "../config/axios";

export const getSessionApi = () => axios.get(`/calendar/session`);

export const addSessionApi = (form) => axios.post(`calendar/session/addSession`, form);

export const updateSessionApi = (sessionId, form) => axios.patch(`/calendar/session/updateSession/${sessionId}`, form);

export const deleteSessionApi = (sessionId) => axios.delete(`/calendar/deleteSession/${sessionId}`);

export const getLeaveRecordByIdApi = (userId) => axios.get(`/calendar/leaveRecord/${userId}`);

export const addLeaveRequestApi = (form) => axios.post(`/calendar/leaveRequest/addLeaveRequest`,form);

export const getHolidayApi = (form) => axios.get(`/calendar/session/getHoliday`,form) //ยิงไปสร้าง Holiday เตรียมลบ

export const getMissingAttendanceApi = (userId) => axios.get(`/calendar/missingAttendance/${userId}`) //เอา getHoliday ไปสร้าง p Holiday

export const publicHolidayApi = (form) => axios.post(`/calendar/publicHoliday`,form) //สร้าง p Holiday
export const editPublicHolidayApi = (publicHolidayId,form) => axios.post(`/calendar/editPublicHoliday/${publicHolidayId}`,form) //Edit p Holiday

//////////////////////////////////////////// API ยืมมาใช้ใน Calendar
export const getUserByIdApi = (userId,token) =>
    axios.get(`/admin/user/${userId}`, {
    headers: { 
      Authorization: `Bearer ${token}`,
    }});



