import React from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addLeaveRequestApi,
  addSessionApi,
  deleteSessionApi,
  editPublicHolidayApi,
  getHolidayApi,
  getLeaveRecordByIdApi,
  getMissingAttendanceApi,
  getSessionApi,
  getUserByIdApi,
  publicHolidayApi,
  updateSessionApi,
} from "../api/calendar-api";

const useCalendarStore = create(
  persist(
    (set, get) => ({
      session: [],
      leaveRecordById: [],
      userById: [],
      holiday: [],
      getSession: async () => {
        try {
          const res = await getSessionApi();
          set({ session: res.data.data });
          // toast(res.data.message);
          return res.data.data;
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get session');
        }
      },

      addLeaveRequest: async (form) => {
        try {
          const resp = await addLeaveRequestApi(form);
          toast.success("Leave request submitted successfully!");
          return resp
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get session');
        }
      },

      addSession: async (form) => {
        try {
          const res = await addSessionApi(form);
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to addSession');
        }
      },
      updateSession: async (sessionId, form) => {
        try {
          const res = await updateSessionApi(sessionId, form);
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to updateSession');
        }
      },
      deleteSession: async (sessionId) => {
        try {
          const res = await deleteSessionApi(sessionId);
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to deleteSession');
        }
      },

      getLeaveRecordById: async (userId) => {
        try {
          const res = await getLeaveRecordByIdApi(userId);
          set({ leaveRecordById: res });
          // toast(res.data.message);
          return res.data.data;
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get LeaveRecord By Id');
        }
      },

      getHoliday: async (form) => {
        try {
          const res = await getHolidayApi(form);
          console.log("res getHoliday", res.data);
          toast(res.data.message);
          set({ holiday: res.data.data });
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get Holiday By Id');
        }
      },

      publicHoliday: async (form) => {
        try {
          const res = await publicHolidayApi(form);
          console.log('res publicHoliday',form)
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get MissingAttendance By Id');
        }
      },

      editPublicHoliday: async (publicHolidayId,form) => {
        try {
          const res = await editPublicHolidayApi(publicHolidayId,form);
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get MissingAttendance By Id');
        }
      },

      getMissingAttendance: async (userId) => {
        try {
          const res = await getMissingAttendanceApi(userId);
          toast(res.data.message);
          return res.data.data;
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get MissingAttendance By Id');
        }
      },

      //////////////////////////////////////////////////// ไม่เกี่ยวกับ Calendar แต่ขอดึงมาใช้

      getUserById: async (userId, token) => {
        try {
          const res = await getUserByIdApi(userId, token);
          set({ userById: res.data });
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get LeaveRecord By Id');
        }
      },
    }),
    {
      name: "calendar-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCalendarStore;
