import { useActivityStore } from "@/stores/useActivityStore";
import { useResetHourStore } from "@/stores/useResetHourStore";
import { useMemo } from "react";

const useTodayActivities = () => {
  const { activityList } = useActivityStore();
  const { resetHour } = useResetHourStore(); // resetHour 가져오기

  return useMemo(() => {
    const now = new Date();

    // 오늘의 resetHour 기준 "리셋 기준 시각" 계산
    const resetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      resetHour,
      0,
      0,
      0
    );

    // 만약 현재 시각이 resetHour 이전이라면, "오늘"은 전날 기준으로 잡기
    if (now < resetTime) {
      resetTime.setDate(resetTime.getDate() - 1);
    }

    const todayKey = resetTime.getTime();
    const tomorrowKey = new Date(
      resetTime.getFullYear(),
      resetTime.getMonth(),
      resetTime.getDate() + 1,
      resetHour,
      0,
      0,
      0
    ).getTime();

    return activityList.filter((a) => {
      const end = a.endTime ?? Date.now(); // endTime이 없으면 현재 시간으로 간주
      return end >= todayKey && end < tomorrowKey;
    });
  }, [activityList, resetHour]);
};

export default useTodayActivities;
