import React from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addSessionApi, deleteSessionApi, getSessionApi, updateSessionApi } from "../api/calendar-api";

const useCalendarStore = create(
  persist(
    (set, get) => ({
      session: null,

      getSession: async () => {
        try {
          const res = await getSessionApi();
          set({ session: res.data });
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get session');
        }
      },
      addSession: async (createUserId,form) => {
        try {
          const res = await addSessionApi(createUserId,form);
          set({ session: res.data });
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get session');
        }
      },
      updateSession: async (sessionId,form) => {
        try {
          const res = await updateSessionApi(sessionId,form);
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get session');
        }
      },
      deleteSession: async (sessionId) => {
        try {
          const res = await deleteSessionApi(sessionId);
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get session');
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
