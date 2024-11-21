import dayjs from "dayjs";
import { useState, useEffect } from "react";
import React from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  // Format date for Bangkok timezone
  const bkkTime = time.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const bkkDate = time.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  console.log('bkkDate', bkkDate)
  return (
    <div className="w-full bg-black bg-opacity-50 text-white p-4">
      <div className="text-center">
        <div className="text-6xl font-bold mb-2">{bkkTime}</div>
        <div className="text-lg uppercase">{bkkDate}</div>
      </div>
    </div>
  );
}

export default Clock;
