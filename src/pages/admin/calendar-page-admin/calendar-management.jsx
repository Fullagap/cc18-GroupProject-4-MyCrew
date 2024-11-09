import React, { useEffect, useState } from "react";
import CalendarAdminComp from "../../../components/admin/calendar-comp-admin/calendar-admin-comp";
import useCalendarStore from "../../../store/calendar-store";
import { colors } from "@mui/material";
import { toast } from "react-toastify";

export default function CalendarManagement() {
  const getSession = useCalendarStore((state) => state.getSession);

  const [events, setEvents] = useState([])

  useEffect(() => {
    hdlGetEvent();
  }, []);

const hdlGetEvent=async()=>{
  const result = await getSession()
  const filterResult = result.filter(el => el.eventType === "HOLIDAY" ||el.eventType === "EVENT").map(event => ({
    id: event.id, 
    title: event.description, 
    start: event.startedDate, // เปลี่ยนเป็น startDate
    end: event.endDate,
    color : el.eventType === "HOLIDAY"?"green":"yellow"
  }));
  setEvents(filterResult)
}

  return (
    <div className="flex p-8">
      Admin
      <div className="border rounded-xl bg-[#F3F8FF] p-8 w-[50%]">
        <CalendarAdminComp hdlGetEvent={hdlGetEvent} events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}
