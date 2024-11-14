import React, { useEffect, useState } from "react";

export default function CalendarDetailModal({ showInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  useEffect(() => {
    if (showInfo && showInfo.length > 0) {
      setIsOpen(true);
    }else{
      setIsOpen(false)
    }
  }, [showInfo]);

  return (
    <div>
      <div>
        <button
          className="border p-2 rounded-xl mb-1 w-full font-bold text-xl bg-[#082777] "
          // onClick={toggleDropdown}
        >
          <p className="text-3xl font-bold text-white">Calendar Detail</p>
        </button>

        <div
          className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
            isOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <div className="flex flex-col border rounded-xl p-4 bg-[#F3F8FF] gap-4 mb-1">
            {showInfo.map((event, index) => (
              <div key={index} className="event-item">
                <h3>{event.title}</h3>
                <p>Start: {new Date(event.start).toLocaleString()}</p>
                
                {event.end && new Date(event.end).getFullYear() !== 1970 && ( //เวลาไม่ได้ตั้งค่า end มันจะใช้ปี1970 เลยเอามาเป็นเงื่อนไข
                  <p>End: {new Date(event.end).toLocaleString()}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
