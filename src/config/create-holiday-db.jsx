// import { useEffect } from "react";

// export default function createHolidayDb() {
//     const publicHoliday = useCalendarStore((state) => state.publicHoliday);
//     const getHoliday = useCalendarStore((state) => state.getHoliday);
//     const holiday = useCalendarStore((state) => state.holiday);

//     useEffect(() => {
//         getHoliday()
//             holiday.map(el => {
//             return {
//                 description: el.description,
//                 day: el.startedDate.getDate(),
//                 month: el.startedDate.getMonth() + 1,
//                 year: el.startedDate.getFullYear(),
//                 dateTime: el.startedDate.toISOString(),
//                 eventType: el.eventType,
//             };
//         });

//         publicHoliday(holiday);
//     }, [getHoliday]);

// }
