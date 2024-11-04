import React, { useEffect, useState } from "react";
import CalendarAdminComp from "../../../components/admin/calendar-comp-admin/calendar-admin-comp";
import useCalendarStore from "../../../store/calendar-store";

const buttonStyle = "border rounded-xl bg-green-400 w-[30%] p-6"


// const AdminHolidayApi = [
//   { id :1,                  
//     targetDate: "2024-11-01" ,        
//     description: "วันพ่อ",        
//     eventType: "HOLIDAY",                    
//     attendanceLimit: 50,    
//     createUserId: 1 
//   },
//   { id :2,                  
//     targetDate: "2024-11-02" ,        
//     description: "วันแม่",        
//     eventType: "HOLIDAY",                    
//     attendanceLimit: 50,    
//     createUserId: 1 
//   },
//   { id :3,                  
//     targetDate: "2024-11-03" ,        
//     description: "วันลูก",        
//     eventType: "HOLIDAY",                    
//     attendanceLimit: 50,    
//     createUserId: 1 
//   },
// ]

export default function CalendarManagement() {

  const getSession = useCalendarStore((state) => state.getSession);
  const session = useCalendarStore((state) => state.session);
  console.log('getSession', getSession.data)
  console.log('session', session)

  // useEffect(() => {
  //   if (getSession) {
  //     getSession();
  //   }
  // }, [getSession]);

  const event = getSession.data.filter(el => el.eventType === "HOLIDAY").map(event => ({
    // ...event, // กระจายคุณสมบัติทั้งหมดจาก event เดิม
    id: event.id.toString(), // แปลง id เป็น string
    title: event.description, // ใช้ description เป็น title
    start: event.targetDate, // ใช้ targetDate เป็น start
  }));
  
  const [events, setEvents] = useState(event)
  const [checkAdd,setCheckAdd] = useState(false)
  const [checkEdit,setCheckEdit] = useState(false)

  return (
    <div className="flex p-8">
      Admin
      <div className="border rounded-xl bg-[#F3F8FF] p-8 w-[50%]">
        <CalendarAdminComp events={events} setEvents={setEvents} checkAdd={checkAdd} setCheckAdd={setCheckAdd} checkEdit={checkEdit} setCheckEdit={setCheckEdit}/>
      </div>
    </div>
  );
}
