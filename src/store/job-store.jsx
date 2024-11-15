import React from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProjectApi, projectCreateApi, projectDeleteApi, projectUpdateApi } from "../api/job-api";


const useJobStore = create(
  persist(
    (set, get) => ({
        projectDataBase: [],
      getProject: async () => {
        try {
          const res = await getProjectApi();
          set({ projectDataBase: res.data.data });
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to get Project');
        }
      },
      projectCreate: async (form) => {
        try {
          const res = await projectCreateApi(form);
          toast(res.data.message);
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to projectCreate');
        }
      },
      projectUpdate: async (projectId,form) => {
        try {
          const res = await projectUpdateApi(projectId,form);
          set({ session: res.data.data });
          toast(res.data.message);
          return res.data.data;
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to projectUpdate');
        }
      },
      projectDelete: async (projectId) => {
        try {
          const res = await projectDeleteApi(projectId);
          set({ session: res.data.data });
          toast(res.data.message);
          return res.data.data;
        } catch (err) {
          console.log(err);
          // toast.error(err?.response?.data?.message || 'Failed to projectDelete');
        }
      },

      
    }),

    {
      name: "job-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useJobStore;
