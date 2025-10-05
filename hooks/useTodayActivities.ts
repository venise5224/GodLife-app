import { useActivityStore } from "@/stores/useActivityStore";
import { useMemo } from "react";

const useTodayActivities = () => {
  const { activityList } = useActivityStore();

  return useMemo(() => {
    const today = new Date();
    const todayKey = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime();

    const tomorrowKey = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    ).getTime();

    return activityList.filter(
      (a) =>
        a.endTime !== undefined &&
        a.endTime >= todayKey &&
        a.endTime < tomorrowKey
    );
  }, [activityList]);
};

export default useTodayActivities;
