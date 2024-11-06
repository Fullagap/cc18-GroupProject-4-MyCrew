import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "../../../../../config/axios";
import useAuthStore from "../../../../../stroes/authSrore";
export default function BarChart() {
  const user = useAuthStore((state) => state.user);
  const [userLeaveData, setUserLeaveData] = useState({});
  const getUserData = async () => {
    const resp = await axios.get(`user/${user.id}`);
    console.log(resp.data);
    setUserLeaveData({
      ALM: resp.data.annualLeaveAmount,
      SLM: resp.data.sickLeaveAmount,
      PLM: resp.data.personalLeaveAmount,
      AL: resp.data.annualLeave,
      SL: resp.data.sickLeave,
      PL: resp.data.personalLeave,
    });
  };
  useEffect(() => {
    getUserData();
  }, []);
  const labels = ["Annaul Leave", "Sick Leave", "Personal Leave"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Remaining leave",
        data: [userLeaveData.ALM, userLeaveData.SLM, userLeaveData.PLM],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          // "rgba(255, 205, 86, 0.2)",
          // 'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          // "rgb(255, 205, 86)",
          // "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          // "rgb(153, 102, 255)",
          // "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
      {
        label: "Maximum Leave",
        data: [userLeaveData.AL, userLeaveData.SL, userLeaveData.PL],
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
          // "rgba(255, 205, 86, 0.2)",
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          // "rgb(255, 99, 132)",
          // "rgb(255, 159, 64)",
          // "rgb(255, 205, 86)",
          // "rgb(75, 192, 192)",
          // "rgb(54, 162, 235)",
          // "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Bar data={data} className="w-full h-full"/>;
}
