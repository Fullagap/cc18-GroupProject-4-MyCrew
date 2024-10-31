import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8890/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                
                localStorage.setItem('token', data.token);
                window.location.href = '/user'; 
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#E5EDF9] p-4">
            <div className="bg-white rounded-lg shadow-lg border border-[#082777] p-6 max-w-md w-full">
                <h2 className="text-[#082777] text-4xl font-bold mb-6 border-b-2 border-[#F7AC25] pb-2 text-center">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="w-full">
                    <div className="mb-4">
                        <label className="block text-[#082777] mb-1">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F7AC25]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#082777] mb-1">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    <a className="text-[#082777] underline" href="/request-change-password">
                        Forgot Password?
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
