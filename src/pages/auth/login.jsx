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
            // toast.success("Login successful");
            
        } catch (error) {
            console.error('Error:', error);
            // toast.error("Login failed. Please try again.");
        }
    };

    const roleRedirect = (role) => {
        if (role?.role === "USER") {
            navigate("/user");
        } else if (role?.role === "ADMIN") {
            navigate("/admin");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#E5EDF9] p-4">
            <div className="bg-white rounded-lg shadow-lg border border-[#082777] p-6 max-w-md w-full">
                <h2 className="text-[#082777] text-4xl font-bold mb-6 border-b-2 border-[#F7AC25] pb-2 text-center">
                    Login
                </h2>
                <form onSubmit={hdlSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="block text-[#082777] mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={hdlOnchange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F7AC25]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#082777] mb-1">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={hdlOnchange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F7AC25]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#F7AC25] text-white border border-[#F7AC25] rounded p-2 font-bold shadow hover:bg-[#d89e1f] transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    <Link className="text-[#082777] underline" to="/request-change-password">
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
