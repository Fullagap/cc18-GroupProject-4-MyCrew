import { create } from "zustand";
import { toast } from "react-toastify";
import { login, requestChangePassword, changePassword } from "../api/auth";
import { persist } from "zustand/middleware";



const useAuthStore = create(persist((set) => ({
    token: null,
    user: null,



    actionLogin: async (form) => {
        try {
            const resp = await login(form);
            const { token, user } = resp;



            set({ token, user });
            toast.success("Login successful!");

            return user;
        } catch (err) {

            toast.error(err.response?.data?.message || "Login failed!");
        }
    },
    actionRequestChangePassword: async (email) => {
        try {
            // console.log("check email", email)
            const resp = await requestChangePassword(email);
            // console.log("check1", resp)
            toast.success("Request to change password sent!");
            return resp;
        } catch (err) {
            toast.error(err.message || "Request change password failed!");
            console.log(err)
        }
    },
    actionChangePassword: async (token, newPassword) => {
        try {
            const resp = await changePassword(token, newPassword);
            toast.success("Password changed successfully!");
            return resp;
        } catch (err) {
            toast.error(err.message || "Change password failed!");
        }
    },


    isLoggedIn: () => set((state) => !!state.token),

    actionLogout: () => {

        set({ token: null, user: null });

        
        toast.success("Logged out successfully!");
    }

}),
    {
        name: 'user&token'
    }

));

export default useAuthStore;
