import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // Import Day Grid plugin
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./event-modal";
import useCalendarStore from "../../../store/calendar-store";
import useAuthStore from "../../../store/authSrore";
import { toast } from "react-toastify";

export default function CalendarComp({ events, setEvents, setDateSelect,setShowInfo }) {
  const addSession = useCalendarStore((state) => state.addSession);
  const updateSession = useCalendarStore((state) => state.updateSession);
  const deleteSession = useCalendarStore((state) => state.deleteSession);
  const user = useAuthStore((state) => state.user);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [checkAdd, setCheckAdd] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);

  useEffect(() => {
    console.log("Loaded Events calendar-comp: ", events);
}, [events]);

  useEffect(() => {
    if (checkAdd) {
      const newEvents = events.map((event) => ({
        createUserId: user.id,
        startedDate: event.start, // เปลี่ยน key เป็น startDate
        endDate: event.end,
        description: event.title,
        eventType: "MEMO",
        attendanceLimit: "50",
      }));
      const lastEvent = newEvents[newEvents.length - 1];
      addSession(lastEvent);
      setCheckAdd(false);
    }
  }, [checkAdd]);

  useEffect(() => {
    if (checkEdit) {
      updateSession(sessionId, editEvent);
      setCheckEdit(false);
    }
  }, [checkEdit]);

  const handleDateSelect = (selectInfo) => {

    const eventsOnSelectedDate = events.filter(event => {
      const eventDate = new Date(event.start).toISOString().split("T")[0];
      const selectedDate = selectInfo.startStr;
      return eventDate === selectedDate;
    });
  
    setShowInfo(eventsOnSelectedDate); // ตั้งค่าอีเวนต์ที่พบในวันนั้น

    const start = selectInfo.startStr; // ถ้าอยากได้เวลาด้วยใช้ info.start
    let end = new Date(selectInfo.endStr);

    end.setDate(end.getDate() - 1);
    const adjustedEnd = end.toISOString().split("T")[0];

    if (selectInfo.startStr === adjustedEnd) {
      setSelectedEvent({ start, end: null, title: "" }); // ถ้าวันเดียว ให้ end เป็น null
    } else {
      setSelectedEvent({ start, end, title: "" }); // ถ้ามีหลายวัน ก็ให้ end เป็นปกติ
    }

    setIsEditing(false);
    setIsModalOpen(true);
    setDateSelect({
      start,
      end: selectInfo.startStr === adjustedEnd ? "" : end,
    });
  };

  const handleEventClick = (info) => {
    const clickedEvent = events.find((event) => event.id == info.event.id);
    if (
      clickedEvent.eventType === "HOLIDAY" ||
      clickedEvent.eventType === "LEAVE"
    ) {
      toast.error("Cannot Edit");
    } else {
      setSelectedEvent({
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
      });
      setIsEditing(true);
      setIsModalOpen(true);
    }
  };

  const handleEventSave = async (updatedEvent) => {
    if (isEditing) {
      const newEventUpDate = {
        createUserId: user.id,
        startedDate: updatedEvent.start, // เปลี่ยน key เป็น startDate
        endDate: updatedEvent.end,
        description: updatedEvent.title,
        eventType: "MEMO",
        attendanceLimit: "50",
      };
      const Id = updatedEvent.id;
      setSessionId(Id);
      setEditEvent(newEventUpDate);
      setCheckEdit(true);
    } else {
      setEvents((prevEvents) => [...prevEvents, { ...updatedEvent }]);
      setCheckAdd(true);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (sessionId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteSession(sessionId);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== sessionId)
      );
    }
    // hdlGetEvent()
  };

  return (
    <div className="flex flex-col rounded-xl p-4 bg-[#F3F8FF] w-full h-[calc(100vh-75px)]">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
        eventClick={handleEventClick}
        displayEventTime={false}
        selectable={true}
        select={handleDateSelect}
        // contentHeight="auto"
        height="100%"  
         contentHeight="100%"
      />
      
      {isModalOpen && (
        <EventModal
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleEventSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
