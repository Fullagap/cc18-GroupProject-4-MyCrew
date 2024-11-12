import { MaterialReactTable } from "material-react-table"; //โหลดใน npm install material-react-table ด้วย
import { useMemo } from "react";

const MyDataBase = [
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

export default function LeaveRecord() {
  //รับ Prop ได้ตามปกติ

  const columns = useMemo(
    //อย่าลืม import useMemo
    () => [
      {
        header: "Record ID",
        accessorKey: "id",
      },
      {
        header: "Request",
        accessorKey: "requestDate",
      },
      {
        header: "Start",
        accessorKey: "startDate",
      },
      {
        header: "End",
        accessorKey: "endDate",
      },
      {
        header: "Type",
        accessorKey: "leaveTypeId",
        accessorFn: (row) => {
          return row?.leaveTypeId?.leaveName;
        },
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={MyDataBase || []} //ใส่ข้อมูลที่อยากให้โชว์ขึ้นตาราง
      enableStickyHeader //ทำให้หัวตารางไม่เลื่อนลงตามสกอเม้า
      //   enableEditing //ใส่ไปเพื่อสร้างปุ่ม edit
      muiTableContainerProps={{
        sx: {
          backgroundColor: "#E5EDF9", //เปลี่ยนสีพื้นหลัง
          maxHeight: "calc(100vh - 170px)",
          minHeight: "calc(100vh - 170px)",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: "#E5EDF9", // เปลี่ยนสีพื้นหลังของเซลล์ใน header
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          backgroundColor: "#F3F8FF", // เปลี่ยนสีพื้นหลังของเซลล์ใน body
        },
      }}
      muiTopToolbarProps={{ // เปลี่ยนสีพื้นหลังของ toolbar ด้านบนที่มี filter
        sx: {
          backgroundColor: "#082777",
          "& .MuiSvgIcon-root": {
            color: "#ffffff", // เปลี่ยนสีของไอคอนเป็นสีขาว
          }, 
        },
      }}
    />
  );
}
