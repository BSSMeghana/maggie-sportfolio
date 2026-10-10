"use client";

import { useEffect, useState } from "react";

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function getVizagTime() {
  return clockFormatter.format(new Date());
}

export function VizagClock() {
  const [time, setTime] = useState(getVizagTime);

  useEffect(() => {
    const interval = window.setInterval(() => setTime(getVizagTime()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return <time dateTime={`${time}+05:30`} suppressHydrationWarning>{time}</time>;
}
