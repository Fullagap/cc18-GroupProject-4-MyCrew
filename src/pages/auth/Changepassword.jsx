import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const param = useParams()
    console.log(param)

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            // แก้ไข URL ที่นี่ โดยแทนที่ PORT ด้วยหมายเลขพอร์ตที่ถูกต้อง
            const response = await fetch('http://localhost:8890/auth/change-password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.msg);
                window.location.href = '/login'; // นำทางไปที่หน้า login
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while changing password. Please try again."); // แสดงข้อความข้อผิดพลาดให้ผู้ใช้
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
                            value={param.token}
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
