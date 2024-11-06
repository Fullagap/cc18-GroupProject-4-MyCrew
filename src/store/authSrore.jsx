import { create } from "zustand";
import { toast } from "react-toastify";
import { login, requestChangePassword, changePassword, resetPassword } from "../api/auth";
import { persist } from "zustand/middleware";




const useAuthStore = create(persist((set, get) => ({
    token: null,
    user: null,



    actionLogin: async (form) => {
        try {
            const resp = await login(form);
            const { token, user } = resp;
            
            

            set({ token, user });
            localStorage.setItem('token', token);
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
    actionResetPassword: async (oldPassword, newPassword) => {
        try {
            const token = get().token; 
            if (!token) {
                toast.error('No authentication token found.');
                return;
            }

            const data = await resetPassword(oldPassword, newPassword, token);
            toast.success(data.msg || 'Password changed successfully!');
            return data;
        } catch (err) {
            console.log(err);
            const errorMessage = err.message;
            if (errorMessage === 'Incorrect old password') {
                toast.error('Old password is incorrect.');
            } else {
                toast.error(errorMessage || 'An error occurred. Please try again.');
            }
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
