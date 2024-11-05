import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Pagination } from "@mui/material";

const data = [
  {
    id: 1,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 1,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 1,
      leaveName: "annualLeave",
    },
  },
  {
    id: 2,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
  {
    id: 3,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
  {
    id: 4,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
  {
    id: 5,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
  {
    id: 6,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
  {
    id: 7,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
  {
    id: 8,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
  {
    id: 9,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
  {
    id: 10,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
  {
    id:11 ,
    userId: 2,
    requestDate: "2024-11-01T09:14:54.121Z",
    startDate: "2022-01-14T00:00:00.000Z",
    endDate: "2022-01-14T00:00:00.000Z",
    leaveTypeId: 2,
    supId: 1,
    status: "APPROVE",
    description: null,
    comment: null,
    leaveCategory: {
      id: 2,
      leaveName: "sickLeave",
    },
  },
];

export default function LeaveStatus() {
  const columns = useMemo(
    () => [
      {
        header: "Item",
        accessorKey: "item",
        accessorFn: (dataRow) => data.indexOf(dataRow) +1
      },
      {
        header: "RequestDate",
        accessorKey: "requestDate",
        accessorFn: (dataRow) => dataRow.requestDate.split("T")[0],
      },
      {
        header: "StartDate",
        accessorKey: "startDate",
        accessorFn: (dataRow) => dataRow.startDate.split("T")[0],
      },
      {
        header: "EndDate",
        accessorKey: "endDate",
        accessorFn: (dataRow) => dataRow.endDate.split("T")[0],
      },
      {
        header: "LeaveType",
        accessorKey: "leaveName",
        accessorFn: (dataRow) => dataRow.leaveCategory.leaveName,
      },
      {
        header: "Status",
        accessorKey: "status",
        accessorFn: (dataRow) => dataRow.status,
      },
    ],
    []
  );

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data : data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    initialState: {
        expanded: true, //expand all rows by default
        pagination: { pageIndex: 0, pageSize: 5 }, //set different default page size
       
      },
    muiTablePaperProps: {
      sx: {
        backgroundColor: "#F3F8FF",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#F3F8FF",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        backgroundColor: "#F3F8FF",
      },
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "#F3F8FF",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        backgroundColor: "#F3F8FF",
      },
    },
    enableStickyHeader : true,
    
    muiPaginationProps: {
        rowsPerPageOptions: [5],
      },
    enableRowSelection: true, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
    // enableBottomToolbar : false
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />;
}
