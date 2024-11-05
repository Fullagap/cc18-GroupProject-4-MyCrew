import BarChart from "./contentChart/BarChart"
import React from "react";

export default function LeaveChart() {
  
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="text-3xl underline">Leave Allowance</h1>
      <BarChart />
    </div>
  );
}
