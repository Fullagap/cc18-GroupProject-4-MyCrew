import React, { useEffect, useState } from "react";
import useAuthStore from "../../../store/authSrore";
import { toast } from "react-toastify";
import useCalendarStore from "../../../store/calendar-store";

export default function LeaveRequest({ dateSelect, hdlGetEvent }) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const getUserById = useCalendarStore((state)=>state.getUserById)
  const userById = useCalendarStore((state)=>state.userById)
  const addLeaveRequest = useCalendarStore((state)=>state.addLeaveRequest)

  // console.log('dateSelect', dateSelect)
  //************************* ต้องเอาข้อมูล limit leave จาก User ถ้าหยุดเกิดกำหนด Leave Request ไม่ได้ **************************
  
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    userId: user.id,
    requestDate: new Date(),
    startDate: "",
    endDate: "",
    leaveTypeId: "",
    supId: userById.supId, // อยากให้มากับ User เลย
    status: "WAITING",
    description: "",
  });

  const initialState = {
    userId: user.id,
    requestDate: new Date(),
    startDate: "",
    endDate: "",
    leaveTypeId: "",
    supId: userById?.supId || "", // ค่าจาก User
    status: "WAITING",
    description: "",
  }

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      supId: userById?.supId || "",  // เติม `supId` หาก `userById.supId` มีค่า
    }));
  }, [userById]);

  useEffect(()=>{
    getUserById(user.id,token)
  },[])

  useEffect(() => {
    if (dateSelect) {
      const formattedEndDate = dateSelect.end 
      ? dateSelect.end instanceof Date 
        ? dateSelect.end.toISOString().split('T')[0]
        : dateSelect.end
      : dateSelect.start;


      setForm((prevForm) => ({
        ...prevForm,
        startDate: dateSelect.start,
        endDate: formattedEndDate ,
      }));
      // setIsOpen(true)   กดแล้วให้ dropdown ลงมา 
    }
  }, [dateSelect]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setForm(initialState)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.startDate) {
      toast.error("Please enter date to leave.");
    } else if (!form.leaveTypeId) {
      toast.error("Please select a leave type.");
    } else {
      if (window.confirm("Please confirm that you want to send this leave request")){
        await addLeaveRequest(form)
        await hdlGetEvent()        
      }
    }
  };

  return (
    <div >
      <button
        className="border p-2 rounded-xl mb-1 w-full font-bold text-xl bg-[#082777] hover:bg-blue-700"
        onClick={toggleDropdown}
      >
        <p className="text-3xl font-bold text-white">Leave Request</p>
      </button>

      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >

        <div className="flex flex-col border rounded-xl p-4 bg-[#F3F8FF] gap-4 mb-1">
    
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <p className="font-semibold">Request Date</p>
              <div>
                {new Date().toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <label className="flex flex-col" onChange={handleChange}>
              <p className="font-semibold">Leave Start Date</p>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </label>

            <label className="flex flex-col" onChange={handleChange}>
              <p className="font-semibold">Leave End Date</p>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </label>

            <label className="flex flex-col">
              <p className="font-semibold">Leave Type</p>
              <select
                name="leaveTypeId"
                value={form.leaveTypeId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select . . .
                </option>
                <option value="1">Annual Leave</option>
                <option value="2">Sick Leave</option>
                <option value="3">personal Leave</option>
              </select>
            </label>

            <textarea
              className="border rounded p-2"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              cols="50"
              placeholder="Enter your reason for leave (e.g., personal, sick, vacation)..."
            ></textarea>

            <button
              className="border rounded-xl p-2 bg-green-400"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
