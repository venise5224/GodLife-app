export interface Activity {
  id: string;
  activityName: string;
  startTime: string;
  endTime?: string;
  source: "plan" | "log";
}
