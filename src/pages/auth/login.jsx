import React, { useState } from 'react';
import useAuthStore from '../../store/authSrore';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

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
        <div className="flex flex-col md:flex-row h-screen bg-[#E5EDF9]">
           
            <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-700 to-blue-500 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="text-4xl md:text-5xl font-bold mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-3" />
                    MyCrew
                </div>
                <p className="text-lg md:text-xl opacity-90 mb-6">
                    Empowering your workforce with efficiency and connectivity.
                </p>
                <img
                    src="https://i0.wp.com/www.collegehippo.com/blog/wp-content/uploads/2020/09/human-resource-management-transparent-png-download-for-free-human-resource-management-png-920_582.jpg?fit=920%2C582&ssl=1"
                    className="w-3/4 md:w-2/3 rounded-lg shadow-lg"
                />
            </div>

           
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-2xl">
                    <h2 className="text-3xl md:text-3xl font-bold text-blue-600 mb-4 text-center">Log In</h2>
                    <p className="text-center text-gray-500 mb-6">
                        Welcome back! Please enter your credentials.
                    </p>
                    <form onSubmit={hdlSubmit} className="space-y-5">
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={hdlOnchange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-300"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={hdlOnchange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-300"
                                placeholder="Password"
                            />
                        </div>
                        <div className="text-right">
                            <Link to="/request-change-password" className="text-blue-500 hover:text-blue-700 transition duration-200">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
