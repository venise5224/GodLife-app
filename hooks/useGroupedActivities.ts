import { useActivityStore } from "@/stores/useActivityStore";
import { DAY_MINUTES } from "@/utils/constants";
import { useMemo } from "react";

const useGroupedActivities = (source: "Plan" | "Log") => {
  const { activityList } = useActivityStore();

  return useMemo(() => {
    // 1. 오늘 자정 기준 timestamp 구하기
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

    // 2. 오늘 날짜의 활동만 필터
    const todayActivities = activityList.filter(
      (a) =>
        a.endTime !== undefined &&
        a.endTime >= todayKey &&
        a.endTime < tomorrowKey
    );

    // 3. source(Plan/Log) 필터 + 유효한 시간만 계산
    const filtered = todayActivities.filter(
      (a) =>
        a.source.toLowerCase() === source.toLowerCase() &&
        a.startTime &&
        a.endTime
    );

    const map = new Map<string, number>();

    filtered.forEach((a) => {
      const mins = Math.round((a.endTime! - a.startTime) / 60000);
      if (mins > 0) {
        map.set(a.activityName, (map.get(a.activityName) ?? 0) + mins);
      }
    });

    const totalMinutes = [...map.values()].reduce((sum, v) => sum + v, 0);

    const grouped = [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, minutes]) => ({
        name,
        minutes,
        percentOfDay: (minutes / DAY_MINUTES) * 100,
        percentOfTotal: totalMinutes ? (minutes / totalMinutes) * 100 : 0,
      }));

    return { totalMinutes, grouped };
  }, [activityList, source]);
};

export default useGroupedActivities;
