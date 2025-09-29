export interface Activity {
  id: string;
  activityName: string;
  startTime: number;
  endTime?: number;
  source: "Plan" | "Log";
}
