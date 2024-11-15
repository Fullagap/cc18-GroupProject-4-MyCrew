import React from "react";
import PDFViewModel from "./component/contentPDF/PDFViewModel";

import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useAuthStore from "../../../store/authSrore";
import axios from "axios";
import { Box, Tooltip } from "@mui/material";

export default function PaySlipPage() {
  const user = useAuthStore((state) => state.user);
  const [payRecord, setPayRecord] = useState([]);
  

  const getPayRecord = async () => {
    const resp = await axios.get(`user/salaries/${user.id}`);
    setPayRecord(resp.data);
  };

  useEffect(() => {
    getPayRecord();
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Item",
        accessorKey: "item",
        accessorFn: (dataRow, index) => {
          return index + 1;
        },
      },
      {
        header: "Month",
        accessorKey: "month",
        accessorFn: (dataRow) => dataRow.month,
      },
      {
        header: "Year",
        accessorKey: "year",
        accessorFn: (dataRow) => dataRow.year,
      },
    ],
    []
  );

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: payRecord, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

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
    enableMultiRowSelection: false,
    enableRowSelection: true, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
    // enableBottomToolbar : false
    
  });

  return (
    <div className="flex items-start">
      {/* <MaterialReactTable
        table={table}
      /> */}
      <PDFViewModel />
    </div>
  );
}
