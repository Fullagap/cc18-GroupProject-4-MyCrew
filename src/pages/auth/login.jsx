import React, { useState } from 'react';
import useAuthStore from '../../store/authSrore';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const actionLogin = useAuthStore((state) => state.actionLogin);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const hdlOnchange = (e) => {
        const { name, value } = e.target;

        if (name === 'password') {
            const numericValue = value.replace(/[^0-9]/g, '');
            if (value !== numericValue) {
                toast.warn('Password field accepts numbers only!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setForm({ ...form, [name]: numericValue });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const hdlSubmit = async (e) => {
        e.preventDefault();
        try {
            const role = await actionLogin(form);
            roleRedirect(role);
        } catch (error) {
            console.error('Error:', error);
            toast.error("Login failed. Please try again.");
        }
    };

    const roleRedirect = (role) => {
        if (role?.role === "USER") {
            navigate("/user/attendance");
        } else if (role?.role === "ADMIN") {
            navigate("/admin");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#E5EDF9] to-[#C8D7EB] p-4">
            <div className="bg-white rounded-lg shadow-2xl border border-[#082777] p-8 max-w-lg w-full">
                <h2 className="text-[#082777] text-4xl font-bold mb-6 border-b-2 border-[#F7AC25] pb-2 text-center">
                    Welcome Back
                </h2>
                <p className="text-gray-500 text-center mb-6">Please login to your account</p>
                <form onSubmit={hdlSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[#082777] font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={hdlOnchange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7AC25] shadow-sm transition duration-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-[#082777] font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={hdlOnchange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7AC25] shadow-sm transition duration-300"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#F7AC25] text-white font-bold py-3 rounded-lg shadow-lg hover:bg-[#d89e1f] transition duration-300 transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-500">
                    <Link className="text-[#082777] font-semibold hover:underline" to="/request-change-password">
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
