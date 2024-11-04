import axios from "../config/axios";

export const login = async (form) => {
    try {
        const response = await axios.post('/auth/login', form);
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Login failed'); 
    }
};

export const requestChangePassword = async (email) => {
    try {
        const response = await axios.patch('/auth/request-change-password', { email });
        return response.data; 
    } catch (error) {
        throw new Error(error.response.data.message || 'Request change password failed'); 
    }
};

export const changePassword = async (token, newPassword) => {
    try {
        const response = await axios.patch('/auth/change-password', { token, newPassword });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Change password failed');
    }
};