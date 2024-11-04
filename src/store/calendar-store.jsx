import React from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSessionApi } from "../api/calendar-api";

const useCalendarStore = create(
  persist(
    (set, get) => ({
      session: null,

      getSession: async () => {
        try {
          const res = await getSessionApi();
          console.log('res', res)
          set({ session: res.data });
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
