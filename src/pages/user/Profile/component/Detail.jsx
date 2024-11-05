import React from "react";

export default function Detail({userInfo}) {
  return (
    <div className="rounded-3xl w-2/3 bg-[#F3F8FF]" >
      <div className="mt-4 mx-4 text-4xl underline mb-4">
        Personal Information :
      </div>
      <div className="mx-4">
        <div className="flex w-full mb-4">
          <div className="flex flex-1 ">Name : {userInfo.firstName}</div>
          <div className="flex flex-1">LastName : {userInfo.lastName}</div>
        </div>
        <div className="flex w-full mb-4">
          <div className="flex flex-1">Email : {userInfo.email}</div>
          <div className="flex flex-1">PhoneNumber : {userInfo.phoneNumber}</div>
        </div>
        <div className="flex w-full mb-4">
          <div className="flex flex-1">Address : {userInfo.address}</div>
        </div>
      </div>
    </div>
  );
}
