import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authSrore';

const RequestChangePassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const actionRequestChangePassword = useAuthStore((state) => state.actionRequestChangePassword);

    const handleRequestChangePassword = async (e) => {
        e.preventDefault();
        const response = await actionRequestChangePassword(email);

        if (response) {
            navigate('/');
        }
    };

    return (
        <div className="bg-[#E5EDF9] h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg flex items-center p-8 max-w-4xl w-full space-x-10">
              
                <div className="w-1/2">
                    <h2 className="text-gray-800 text-2xl font-bold mb-2">Forgot your password?</h2>
                    <p className="text-gray-600 mb-6">Don’t worry. We’ll reset your password and send you a link to create a new one.</p>
                    <form onSubmit={handleRequestChangePassword}>
                        <div className="mb-4">
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-300"
                        >
                            Reset password
                        </button>
                    </form>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <img
                        src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1731385197~exp=1731388797~hmac=617e981496a0c1c0b690a096ca1b9f4dfa8920a13a83f30d240b81fedb694e2d&w=740"
                        className="w-full max-w-xs"
                    />
                </div>
            </div>
        </div>
    );
};

export default RequestChangePassword;
