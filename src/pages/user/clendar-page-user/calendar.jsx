import React, { useEffect, useState } from "react";
import CalendarComp from "../../../components/user/calendar-comp-user/calendar-comp";
import { Link } from "react-router-dom";
import useCalendarStore from "../../../store/calendar-store";
import useAuthStore from "../../../store/authSrore";
import LeaveRequest from "../../../components/user/calendar-comp-user/leave-request";
import CalendarDetailModal from "../../../components/user/calendar-comp-user/calendar-detail-modal";

export default function Calendar() {

  const getSession = useCalendarStore((state) => state.getSession);
  const getLeaveRecordById = useCalendarStore((state) => state.getLeaveRecordById);
  // const getMissingAttendance = useCalendarStore((state)=>state.getMissingAttendance) //ยังไม่ใช้
  const user = useAuthStore((state) => state.user);

  const [events, setEvents] = useState([]);
  const [dateSelect,setDateSelect] = useState("")
  const [showInfo,setShowInfo] = useState([])

  useEffect(() => {
    hdlGetEvent();
  }, []);

  useEffect(() => {
    console.log("Loaded Events calendar: ", events);
}, [events]);

  const hdlGetEvent = async () => {
  //   const missingAttendance = await getMissingAttendance(user.id)
  //  console.log('missingAttendance', missingAttendance)
   
  const resultSession = await getSession();
   const holidayEvents = resultSession.filter((el) => el.eventType === "HOLIDAY" ||el.eventType === "EVENT").map((event) => ({
        id: event.id,
        title: event.description,
        start: event.startedDate, //เปลี่ยนเป็นStartDate
        end: event.endDate, 
        eventType: event.eventType,
        color : event.eventType === "HOLIDAY"?"green":"yellow"
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
    <div className="flex h-full w-full p-2">

      <div className="w-full">
        <CalendarComp events={events} setEvents={setEvents} setDateSelect={setDateSelect} hdlGetEvent={hdlGetEvent} setShowInfo={setShowInfo}/>
      </div>
      
      <div className="w-[300px] px-4">

        <div className="w-full">
        <CalendarDetailModal showInfo={showInfo}/>
        </div>

        <div className=" w-full">
        <LeaveRequest dateSelect={dateSelect} hdlGetEvent={hdlGetEvent}/>
        </div>
      </div>

    </div>
  );
}
