import React, { useEffect, useState } from "react";
import CalendarComp from "../../../components/user/calendar-comp-user/calendar-comp";
import { Link } from "react-router-dom";
import useCalendarStore from "../../../store/calendar-store";
import useAuthStore from "../../../stroes/authSrore";
import LeaveRequest from "../../../components/user/calendar-comp-user/leave-request";
import CalendarDetailModal from "../../../components/user/calendar-comp-user/calendar-detail-modal";

export default function Calendar() {

  const getSession = useCalendarStore((state) => state.getSession);
  const getLeaveRecordById = useCalendarStore((state) => state.getLeaveRecordById);
  // const getMissingAttendance = useCalendarStore((state)=>state.getMissingAttendance) //ยังไม่ใช้
  const user = useAuthStore((state) => state.user);

  const [events, setEvents] = useState([]);
  const [dateSelect,setDateSelect] = useState("")

  useEffect(() => {
    hdlGetEvent();
  }, []);

  const hdlGetEvent = async () => {
  //   const missingAttendance = await getMissingAttendance(user.id)
  //  console.log('missingAttendance', missingAttendance)
   
  const resultSession = await getSession();
   const holidayEvents = resultSession.filter((el) => el.eventType === "HOLIDAY").map((event) => ({
        id: event.id,
        title: event.description,
        start: event.startedDate, //เปลี่ยนเป็นStartDate
        end: event.endDate, 
        eventType: event.eventType,
        color: "green",
      }));

    const memoEvents = resultSession
      .filter((el) => el.eventType === "MEMO" && el.createUserId === user.id)
      .map((event) => ({
        id: event.id,
        title: event.description,
        start: event.startedDate,//เปลี่ยนเป็นStartDate
        end: event.endDate, 
        eventType: event.eventType,
        color: "blue",
      }));

    const resultLeaveRecord = await getLeaveRecordById(user.id);
    const leaveEvents = resultLeaveRecord.filter(el=>el.status === "WAITING" || el.status === "APPROVE"  ).map((leave) => ({
      id: `leave-${leave.id}`,
      title: leave.leaveCategory.leaveName,
      start: leave.startDate,
      end: leave.endDate,
      eventType: "LEAVE",
      color: leave.status === "WAITING" ? "Gray" : "Red"
    }));

    setEvents([...holidayEvents, ...memoEvents, ...leaveEvents]);
  };

  return (
    <div className="flex p-8">

      <div className="border rounded-xl bg-[#F3F8FF] p-8 w-[50%]">
        <CalendarComp events={events} setEvents={setEvents} setDateSelect={setDateSelect} hdlGetEvent={hdlGetEvent} />
      </div>
      
      <div className="flex flex-col items-center w-[50%]">

        <Link className="border p-2 rounded-xl mb-1 w-[50%] font-bold text-xl bg-[#082777] hover:bg-blue-700" to="/calendar/leave-record">
        <p className="text-3xl font-bold text-white text-center">Leave Record</p>
        </Link>
        <div className="w-[50%]">
        <CalendarDetailModal/>
        </div>

        <div className="w-[50%]">
        <LeaveRequest dateSelect={dateSelect} hdlGetEvent={hdlGetEvent}/>
        </div>
      </div>

    </div>
  );
}
