import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // Import Day Grid plugin
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../../user/calendar-comp/event-modal";


export default function CalendarAdminComp({events,setEvents,check,setCheck}) {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form,setForm] = useState([])
  
//  useEffect(() => {
//   if (check) {
//     const newForm = events.map((event) => ({
//       id: parseInt(event.id) || "", // แปลง id เป็นตัวเลข
//       targetDate: event.start,      // ใช้ start เป็น targetDate
//       description: event.title,     // ใช้ title เป็น description
//       attendanceLimit: 50,          // กำหนดค่าเริ่มต้น
//       createUserId: 1,
//     }));
//     setForm(newForm);
//     console.log('ข้อมูลที่เตรียมส่งไป:', newForm);
//     setCheck(false);
//     }
//   }, [check]);

  useEffect(() => {
    if (check) {
      const newEvents = events.map((event) => ({
        // ...event, // กระจายค่าคุณสมบัติเดิมทั้งหมดจาก item
        id: event.id.toString() || "", // แปลง id กลับเป็น string
        targetDate: event.start,       // ใช้ targetDate เป็น start
        description: event.title,
        eventType: "HOLIDAY",
        attendanceLimit: "50"      
      }));
      setForm(newEvents);
      console.log('ข้อมูลที่เตรียมแปลงกลับ:', newEvents);
      setCheck(false);
    }
  }, [check]);


 const handleDateClick = (info) => {
    setSelectedEvent({ start: info.dateStr, title: "" }); // ตั้งค่าเริ่มต้น
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
   
    } else {
      setEvents((prevEvents) => [
        ...prevEvents,
        { ...updatedEvent, id: (events.length + 1).toString() }, //อย่าลืมเอา ID ออก
      ]);
    }
    setIsModalOpen(false);
    setCheck(true)
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
