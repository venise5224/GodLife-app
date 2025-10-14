import { useEffect, useState } from "react";

export const useCurrentTime = (interval: number = 1000) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return time;
};
