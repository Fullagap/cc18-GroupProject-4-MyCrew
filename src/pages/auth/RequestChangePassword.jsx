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
            <div className="bg-white rounded-lg shadow-lg border border-[#082777] p-6 w-96">
                <h2 className="text-[#082777] text-3xl font-bold text-center mb-6">Request Change Password</h2>
                <form onSubmit={handleRequestChangePassword}>
                    <div className="mb-4">
                        <label className="block text-[#082777] mb-1" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-[#F7AC25]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#F7AC25] text-white font-bold py-2 rounded-lg w-full hover:bg-[#e0a524] transition duration-300"
                    >
                        Request Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestChangePassword;
