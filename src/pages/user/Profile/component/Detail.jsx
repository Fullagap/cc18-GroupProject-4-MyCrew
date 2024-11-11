import React from "react";

export default function Detail({ userInfo }) {
  return (
    <div className="rounded-3xl w-full max-w-4xl bg-[#F3F8FF] p-6 shadow-lg mx-auto">
      <h2 className="text-3xl font-semibold underline mb-6 text-blue-900">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-lg">
        <div>
          <span className="font-semibold text-gray-700">First Name:</span>
          <p className="text-gray-800">{userInfo.firstName || "N/A"}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Last Name:</span>
          <p className="text-gray-800">{userInfo.lastName || "N/A"}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Email:</span>
          <p className="text-gray-800">{userInfo.email || "N/A"}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Phone Number:</span>
          <p className="text-gray-800">{userInfo.phoneNumber || "N/A"}</p>
        </div>
        <div className="sm:col-span-2">
          <span className="font-semibold text-gray-700">Address:</span>
          <p className="text-gray-800">{userInfo.address || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
