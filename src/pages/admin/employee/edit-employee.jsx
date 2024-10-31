import React from 'react'

export default function EditEmployee() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Add New User Information</h2>
        <div className="grid grid-cols-2 gap-6">
            <div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Firstname</label>
                    <div className="flex items-center">
                        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Start Date:</label>
                    <div className="flex items-center">
                        <input type="date" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">E-mail:</label>
                    <div className="flex items-center">
                        <input type="email" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Phone Number:</label>
                    <div className="flex items-center">
                        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Position:</label>
                    <select className="border rounded w-full py-1 px-2 text-gray-700">
                        <option>Marketing</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Employee Status:</label>
                    <select className="border rounded w-full py-1 px-2 text-gray-700">
                        <option>active</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Annual Leave:</label>
                    <select className="border rounded w-full py-1 px-2 text-gray-700">
                        <option>active</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Without Pay leave:</label>
                    <select className="border rounded w-full py-1 px-2 text-gray-700">
                        <option>active</option>
                    </select>
                </div>
            </div>
            <div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Lastname</label>
                    <div className="flex items-center">
                        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">End Date:</label>
                    <div className="flex items-center">
                        <input type="date" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Id Number:</label>
                    <div className="flex items-center">
                        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Bookbank Number:</label>
                    <div className="flex items-center">
                        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Department:</label>
                    <select className="border rounded w-full py-1 px-2 text-gray-700">
                        <option disabled>Please select</option>
                        <option>Marketing</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Salary:</label>
                    <div className="flex items-center">
                        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Sick leave:</label>
                    <div className="flex items-center">
                        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700" />
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center mt-6">
            <button className="bg-blue-500 text-white font-semibold py-1.5 px-4 rounded hover:bg-blue-600">
                Submit
            </button>
        </div>
    </div>
</div>
  )
}
