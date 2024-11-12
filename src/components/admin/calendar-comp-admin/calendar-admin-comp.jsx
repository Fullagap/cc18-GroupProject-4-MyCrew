import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // Import Day Grid plugin
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../../user/calendar-comp-user/event-modal";
import useCalendarStore from "../../../store/calendar-store";
import useAuthStore from "../../../store/authSrore";
import SelectEventHolidayModal from "./select-event-holiday-modal";

export default function CalendarAdminComp({ hdlGetEvent, events, setEvents }) {
  const addSession = useCalendarStore((state) => state.addSession);
  const updateSession = useCalendarStore((state) => state.updateSession);
  const deleteSession = useCalendarStore((state) => state.deleteSession);
  const publicHoliday = useCalendarStore((state) => state.publicHoliday);
  const editPublicHoliday = useCalendarStore(
    (state) => state.editPublicHoliday
  );
  const user = useAuthStore((state) => state.user);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectEventHoliday, setModalSelectEventHoliday] = useState(false);
  const [selectEventType, setSelectEventType] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [checkAdd, setCheckAdd] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);

  const [updatedEvent, setUpdatedEvent] = useState(null);

  useEffect(() => {
    if (checkAdd) {
      const newSelectEventType = selectEventType;
      const newEvents = events.map((event) => ({
        createUserId: user.id,
        startedDate: event.start, // เปลี่ยน key เป็น startDate
        endDate: event.end,
        description: event.title,
        eventType: newSelectEventType,
        attendanceLimit: "50",
      }));
      const lastEvent = newEvents[newEvents.length - 1];
      console.log("ข้อมูลที่เตรียมแปลงกลับ ไป add:", lastEvent);
      addSession(lastEvent);

      if (lastEvent.eventType === "HOLIDAY") {
        const startedDate = new Date(lastEvent.startedDate); // แปลง startedDate ให้เป็น Date
        const createPublicHoliday = {
          description: lastEvent.description,
          date: startedDate.getDate(),
          month: startedDate.getMonth() + 1, // เดือนใน JavaScript เริ่มต้นที่ 0
          year: startedDate.getFullYear(),
          dateTime: startedDate.toISOString(), // แปลงเป็น ISO String
        };
        publicHoliday(createPublicHoliday);
      }
      setCheckAdd(false);
    }
  }, [checkAdd, selectEventType]);

  useEffect(() => {
    if (checkEdit) {
      console.log("ข้อมูลที่เตรียมแปลงกลับ ไป edit:", editEvent);
      updateSession(sessionId, editEvent);

      const startedDate = new Date(editEvent.startedDate); // แปลง startedDate ให้เป็น Date
      const updatePublicHoliday = {
        description: editEvent.description,
        date: startedDate.getDate(),
        month: startedDate.getMonth() + 1, // เดือนใน JavaScript เริ่มต้นที่ 0
        year: startedDate.getFullYear(),
        dateTime: startedDate.toISOString(), // แปลงเป็น ISO String
      };
      editPublicHoliday(editEvent.id, updatePublicHoliday); //คิดว่าต้องรีเซ็ต dataBase เพื่อให้ idของ PublicHoliday ตรงกับไอดี Secction
      setCheckEdit(false);
    }
  }, [checkEdit]);

  const handleDateSelect = (info) => {
    const start = info.startStr; // ถ้าอยากได้เวลาด้วยใช้ info.start
    let end = new Date(info.endStr);

    end.setDate(end.getDate() - 1);
    const adjustedEnd = end.toISOString().split("T")[0];

    if (info.startStr === adjustedEnd) {
      setSelectedEvent({ start, end: null, title: "" }); // ถ้าวันเดียว ให้ end เป็น null
    } else {
      setSelectedEvent({ start, end, title: "" }); // ถ้ามีหลายวัน ก็ให้ end เป็นปกติ
    }
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    console.log("info", info);
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // const handleEventSave = async (updatedEvent) => {
  //     setModalSelectEventHoliday(true);
  //   if (isEditing) {
  //     const newEventUpDate = {
  //       createUserId: user.id,
  //       startedDate: updatedEvent.start, // เปลี่ยน key เป็น startDate
  //       endDate: updatedEvent.end,
  //       description: updatedEvent.title,
  //       // eventType: "HOLIDAY",
  //       attendanceLimit: "",
  //     };
  //     const Id = updatedEvent.id;

  //     setSessionId(Id);
  //     setEditEvent(newEventUpDate);
  //     setCheckEdit(true);
  //   } else {
  //     setEvents((prevEvents) => [...prevEvents, { ...updatedEvent }]);
  //     setCheckAdd(true);
  //   }
  //   setIsModalOpen(false);
  // };

  const handleEventSave = async (updatedEvent) => {
    setUpdatedEvent(updatedEvent);
    setModalSelectEventHoliday(true);
    setIsModalOpen(false);
  };

  const handleEventSave2 = async () => {
    //ใช้แค่ใน Admin ใน user จะไม่มี
    if (isEditing) {
      const newEventUpDate = {
        createUserId: user.id,
        startedDate: updatedEvent.start, // เปลี่ยน key เป็น startDate
        endDate: updatedEvent.end,
        description: updatedEvent.title,
        // eventType: "HOLIDAY",
        attendanceLimit: "",
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
      ); // เอาไวReRender State *แต่ยังไม่ได้
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
        eventClick={handleEventClick}
        displayEventTime={false}
        selectable={true}
        select={handleDateSelect}
        contentHeight="auto"
      />

      {isModalOpen && (
        <EventModal
          setModalSelectEventHoliday={setModalSelectEventHoliday}
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleEventSave}
          onDelete={handleDelete}
        />
      )}

      {modalSelectEventHoliday && (
        <SelectEventHolidayModal
          setModalSelectEventHoliday={setModalSelectEventHoliday}
          setSelectEventType={setSelectEventType}
          handleEventSave2={handleEventSave2}
        />
      )}
    </div>
  );
}
