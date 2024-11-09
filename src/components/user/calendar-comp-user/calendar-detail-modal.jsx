import React, { useState } from "react";

export default function CalendarDetailModal() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

  return (
    <div>
      <div>
        <button
          className="border p-2 rounded-xl mb-1 w-full font-bold text-xl bg-[#082777] hover:bg-blue-700"
          onClick={toggleDropdown}
        >
          <p className="text-3xl font-bold text-white">Calendar Detail</p>
        </button>

        <div
          className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
            isOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
            <div className="flex flex-col border rounded-xl p-4 bg-[#F3F8FF] gap-4 mb-1">
            test
            </div>
                
        </div>

      </div>
    </div>
  );
}
