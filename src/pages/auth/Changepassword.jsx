import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuthStore from '../../store/authSrore';

const ChangePassword = () => {
    const [tokenVisible, setTokenVisible] = useState(false);
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
        <div className="bg-[#E5EDF9] min-h-screen flex items-center justify-center p-4">
            <div className="bg-white flex flex-col md:flex-row items-center rounded-lg shadow-lg p-6 md:p-10 max-w-4xl w-full">
                
                <div className="md:w-1/2 w-full mb-6 md:mb-0 md:pr-8">
                    <h2 className="text-[#082777] text-2xl md:text-3xl font-bold mb-4">Change Your Password</h2>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                        Please enter your new password below. After resetting, you can log in with the updated password.
                    </p>
                    <form onSubmit={handleChangePassword}>
                        <div className="mb-4 relative">
                            <label className="block text-[#082777] font-medium mb-2" htmlFor="token">Reset Token</label>
                            <input
                                type={tokenVisible ? "text" : "password"}
                                id="token"
                                value={paramToken}
                                readOnly
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-[#F7AC25] pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setTokenVisible(!tokenVisible)}
                                className="absolute inset-y-0 right-4 top-2/3 transform -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {tokenVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#082777] font-medium mb-2" htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-[#F7AC25]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#F7AC25] text-white font-bold py-3 rounded-lg w-full hover:bg-[#e0a524] transition duration-300"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
              
                <div className="md:w-1/2 w-full flex justify-center items-center">
                    <img
                        src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?t=st=1731389658~exp=1731393258~hmac=fb874990b1b67071f35eb3531458d82e8262a0a3276f40d17634482cc8cf5c16&w=900"
                        className="max-w-full h-auto md:max-w-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
