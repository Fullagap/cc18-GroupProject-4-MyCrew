import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authSrore';

const ResetPassword = () => {
    const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
    const navigate = useNavigate();
    const { actionResetPassword } = useAuthStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (!/^\d*$/.test(value)) {
            toast.error('Please enter only numbers.');
            return;
        }
        
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.oldPassword === form.newPassword) {
            toast.error("New password cannot be the same as old password.");
            return;
        }

        try {
            const result = await actionResetPassword(form.oldPassword, form.newPassword);
            if (result) { 
                navigate('/');
            } else {
                toast.error('Failed to reset password. Please try again.');
            }
        } catch (err) {
            console.log(err);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Old Password:</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={form.oldPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                            pattern="\d*"
                            onInvalid={(e) => {
                                e.preventDefault();
                                toast.error('Please enter only numbers.');
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                            pattern="\d*"
                            onInvalid={(e) => {
                                e.preventDefault();
                                toast.error('Please enter only numbers.');
                            }}
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded p-2 font-bold"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
