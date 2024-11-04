import React, { useState } from 'react'
import CalendarComp from '../../components/user/calendar-comp/calendar-comp'
import { Link } from 'react-router-dom'

const buttonStyle = "border rounded-xl bg-green-400 w-[30%] p-6"

const AdminHolidayApi = [
  { id :1,                  
    targetDate: "2024-11-01" ,        
    description: "วันพ่อ",        
    eventType: "HOLIDAY",                    
    attendanceLimit: 50,    
    createUserId: 1 
  },
  { id :2,                  
    targetDate: "2024-11-02" ,        
    description: "วันแม่",        
    eventType: "HOLIDAY",                    
    attendanceLimit: 50,    
    createUserId: 1 
  },
  { id :3,                  
    targetDate: "2024-11-03" ,        
    description: "วันลูก",        
    eventType: "HOLIDAY",                    
    attendanceLimit: 50,    
    createUserId: 1 
  },
  { id :4,                  
    targetDate: "2024-11-04" ,        
    description: "ประชุมใหญ๋",        
    eventType: "MEMO",                    
    attendanceLimit: 50,    
    createUserId: 2 
  },
  { id :5,                  
    targetDate: "2024-11-04" ,        
    description: "ประชุมเล็ก",        
    eventType: "MEMO",                    
    attendanceLimit: 50,    
    createUserId: 2 
  },
]

const LeaveRecordAPI = [
  {
    id: 1,
    userId: 2,
    requestDate: "2024-11-03",
    startDate: "2024-11-03",
    endDate: "2024-11-04",
    leaveTypeId: { id: 1, leaveName: "ลาป่วย" }, //1เป็นลาป่วย
    supId: 1,
    status: "pending",
    description: "ปวดท้อง",
    comment: "",
  },
  {
    id: 2,
    userId: 2,
    requestDate: "2024-11-06",
    startDate: "2024-11-06",
    endDate: "2024-11-06",
    leaveTypeId: { id: 2, leaveName: "ลาป่วย" }, //1เป็นลาป่วย
    supId: 1,
    status: "pending",
    description: "ปวดท้อง",
    comment: "",
  },
  {
    id: 3,
    userId: 2,
    requestDate: "2024-11-25",
    startDate: "2024-11-25",
    endDate: "2024-11-28",
    leaveTypeId: { id: 3, leaveName: "ลากิจ" }, //2ลากิจ
    supId: 1,
    status: "pending",
    description: "ไปงานศพหมา",
    comment: "",
  },
];

export default function Calendar() {
  
  const holidayEvents = AdminHolidayApi.filter(el => el.eventType === "HOLIDAY" || el.eventType === "MEMO").map(event => ({
    id: event.id.toString(),
    title: event.description,
    start: event.targetDate,
    eventType: event.eventType,
  }));

 
  const leaveEvents = LeaveRecordAPI.map(leave => ({
    id: `leave-${leave.id}`, // ให้ id ไม่ซ้ำกับ holiday
    title: leave.leaveTypeId.leaveName, // ชื่อการหยุด เช่น "ลาป่วย"
    start: leave.startDate,
    end: leave.endDate, // end date สำหรับการแสดงช่วงเวลาการหยุด
    eventType: "LEAVE",
  }));
  
  const [events, setEvents] = useState([...holidayEvents, ...leaveEvents]);
  const [check,setCheck] = useState(false)

  return (
    <div className='flex p-8'>
    
      <div className='border rounded-xl bg-[#F3F8FF] p-8 w-[50%]'>
    <CalendarComp events={events} setEvents={setEvents} check={check} setCheck={setCheck}/>
      </div>
      <div className='flex flex-col w-[50%] items-center gap-16'>

      <Link className={buttonStyle} to="/calendar/leave-record">
        Leave Record
      </Link>

        <button className={buttonStyle}>Test1</button>
        <button className={buttonStyle}>Test1</button>
      </div>

    </div>
  )
}
