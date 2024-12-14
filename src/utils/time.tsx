import { useEffect, useState } from "react";

export function useNow(interval: number = 500) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(Date.now());
    }, interval);

    return () => {
      clearInterval(timerId);
    };
  }, [interval]);

  return now;
}

/**
 * 把时间戳转换为{days,hours,minutes,seconds}
 * @param time 时间戳
 */
export function parseTime(time: number) {
  const days = Math.floor(time / (24 * 60 * 60 * 1000));
  const hours = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((time % (60 * 1000)) / 1000);

  return { days, hours, minutes, seconds };
}
