import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // Import Day Grid plugin
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../../user/calendar-comp/event-modal";
import useCalendarStore from "../../../store/calendar-store";


export default function CalendarAdminComp({events,setEvents,checkAdd,setCheckAdd,checkEdit,setCheckEdit}) {
  const addSession = useCalendarStore((state)=>state.addSession)
  const updateSession = useCalendarStore((state)=>state.updateSession)

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form,setForm] = useState([])
  
  useEffect(() => {
    if (checkAdd) {
      const newEvents = events.map((event) => ({
        id: event.id.toString() || "", 
        targetDate: event.start,     
        description: event.title,
        eventType: "HOLIDAY",
        attendanceLimit: "50"      
      }));
      setForm(newEvents);
      console.log('ข้อมูลที่เตรียมแปลงกลับ ไป add:', newEvents);
      addSession(newEvents)
      setCheckAdd(false);
    }
  }, [checkAdd]);
  
  useEffect(() => {
    if (checkEdit) {
      const newEvents = events.map((event) => ({
        id: event.id.toString() || "", 
        targetDate: event.start,     
        description: event.title,
        eventType: "HOLIDAY",
        attendanceLimit: "50"      
      }));
      setForm(newEvents);
      console.log('ข้อมูลที่เตรียมแปลงกลับ ไป edit:', newEvents);
      updateSession(newEvents)
      setCheckEdit(false);
    }
  }, [checkEdit]);


 const handleDateClick = (info) => {
    setSelectedEvent({ start: info.dateStr, title: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent({ id: info.event.id, title: info.event.title, start: info.event.start }); 
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEventSave = async (updatedEvent) => {
    if (isEditing) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
    )
  );
  setCheckEdit(true)
    } else {
      setEvents((prevEvents) => [
        ...prevEvents,
        { ...updatedEvent, id: (events.length + 1).toString() }, //อย่าลืมเอา ID ออก
      ]);
      setCheckAdd(true)
    }
    setIsModalOpen(false);
    
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        displayEventTime={false}
      />

      {isModalOpen && (
        <EventModal
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleEventSave}
        />
      )}

    </div>
  );
}
