import React from "react";

export default function SelectEventHolidayModal({
  setModalSelectEventHoliday,setSelectEventType,handleEventSave2
}) {
  const hdlClick = (type) => {
    setSelectEventType(type)
    handleEventSave2()
    setModalSelectEventHoliday(false);
  };

  return (
    <div className="bg-slate-300 p-4 rounded-xl">
      <p className="text-lg font-semibold mb-2">Choose Event Type</p>
      <p className="text-sm text-gray-600 mb-4">
        Please select whether this entry is an Event (e.g., meeting, fire drill)
        or a Holiday (e.g., Mother's Day, Public Holiday).
      </p>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={()=>hdlClick("EVENT")}
        >
          Event
        </button>
        <button
          className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={()=>hdlClick("HOLIDAY")}
        >
          Holiday
        </button>
      </div>
    </div>
  );
}
