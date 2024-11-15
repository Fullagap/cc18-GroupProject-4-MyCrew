import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Pagination } from "@mui/material";
import useAuthStore from "../../../../store/authSrore";
import axios from "../../../../config/axios";

export default function LeaveStatus() {
  const user = useAuthStore((state) => state.user);
  const [leaveRecord, setLeaveRecord] = useState([]);

  const getLeaveRecord = async () => {
    const resp = await axios.get(`user/leave-record/${user.id}`);
    setLeaveRecord(resp.data);
    
  };

  useEffect(() => {
    getLeaveRecord();
  }, []);
  const columns = useMemo(
    () => [
      {
        header: "Item",
        accessorKey: "item",
        accessorFn: (dataRow,index) => {
          return (index + 1);
        },
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
    data: leaveRecord, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
    enableStickyHeader: true,
    
    muiPaginationProps: {
      rowsPerPageOptions: [5],
    },
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
    // enableBottomToolbar : false
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />;
}
