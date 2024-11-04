import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stroes/authSrore';

const ChangePassword = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { token: paramToken } = useParams(); 
    const navigate = useNavigate();
    const actionChangePassword = useAuthStore((state) => state.actionChangePassword); 

    

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const response = await actionChangePassword(paramToken, newPassword); 
        if (response) {
            alert(response.msg); 
            navigate('/'); 
        } else {
            alert("Failed to change password."); 
        }
    };

    return (
        <div className="bg-[#E5EDF9] h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg border border-[#082777] p-6 w-96">
                <h2 className="text-[#082777] text-3xl font-bold text-center mb-6">Change Password</h2>
                <form onSubmit={handleChangePassword}>
                    <div className="mb-4">
                        <label className="block text-[#082777] mb-1" htmlFor="token">Reset Token:</label>
                        <input
                            type="text"
                            id="token"
                            value={paramToken} 
                            onChange={(e) => setToken(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-[#F7AC25]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#082777] mb-1" htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-[#F7AC25]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#F7AC25] text-white font-bold py-2 rounded-lg w-full hover:bg-[#e0a524] transition duration-300"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
