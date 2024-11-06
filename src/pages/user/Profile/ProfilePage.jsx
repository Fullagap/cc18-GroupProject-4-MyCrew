import { Avatar } from "@mui/material";
import React from "react";
import Information from "./InformationPage";
import LeaveStatusPage from "./LeaveStatusPage";
import DocconPage from "./DocconPage";
import LeaveChartPage from "./LeaveChartPage";

export default function ProfilePage(props) {
  const { info, chart, req, dcc } = props;
  console.log("ProfilePage",info, chart, req, dcc);
  return (
    <>
      {info ? <Information /> : null}
      {chart ? <LeaveChartPage /> : null}
      {req ? <LeaveStatusPage /> : null}
      {dcc ? <DocconPage /> : null}
    </>
  );
}
