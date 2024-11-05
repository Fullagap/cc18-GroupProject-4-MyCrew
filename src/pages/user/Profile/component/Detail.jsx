import React from "react";

export default function Detail() {
  return (
    <div className="rounded-3xl w-2/3 bg-[#F3F8FF]" >
      <div className="mt-4 mx-4 text-4xl underline mb-4">
        Personal Information :
      </div>
      <div className="mx-4">
        <div className="flex w-full mb-4">
          <div className="flex flex-1 ">Name : XXXXXXX</div>
          <div className="flex flex-1">LastName : XXXXXXX</div>
        </div>
        <div className="flex w-full mb-4">
          <div className="flex flex-1">Email : XXXXXXX</div>
          <div className="flex flex-1">PhoneNumber : XXXXXXX</div>
        </div>
        <div className="flex w-full mb-4">
          <div className="flex flex-1">Address : XXXXXXX</div>
        </div>
      </div>
    </div>
  );
}
