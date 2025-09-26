import { useActivityStore } from "@/stores/useActivityStore";
import { Activity } from "@/types/Activity";
import { describeArc, polarToCartesian } from "@/utils/circleUtils";
import { parseTime } from "@/utils/timeUtils";
import { G, Path, Text as SvgText } from "react-native-svg";

interface TimelineActivityProps {
  activity: Activity;
  cx: number;
  cy: number;
  r: number;
  currentMinutes: number | null;
}

const TimelineActivity = ({
  activity,
  cx,
  cy,
  r,
  currentMinutes,
}: TimelineActivityProps) => {
  const { removeActivity } = useActivityStore();

  const start = parseTime(activity.startTime);
  const end =
    activity.source === "log" && !activity.endTime && currentMinutes !== null
      ? currentMinutes
      : parseTime(activity.endTime || activity.startTime);

  const adjustedEnd = end < start ? end + 1440 : end;
  const mid = (start + adjustedEnd) / 2;
  const midMinutes = mid % 1440;

  const textPos = polarToCartesian(cx, cy, midMinutes, r * 0.6);
  const radius = r;

  const arcPath = describeArc(cx, cy, start, end, radius);
  const fillColor =
    activity.source === "plan"
      ? "rgba(234, 179, 8, 1)"
      : "rgba(34, 197, 94, 1)";

  const strokeDasharray =
    activity.source === "log" && !activity.endTime ? "4 4" : undefined;

  return (
    <G>
      <Path
        d={arcPath}
        fill={fillColor}
        stroke="#000"
        strokeWidth={1}
        strokeDasharray={strokeDasharray}
      />
      <SvgText
        x={textPos.x}
        y={textPos.y}
        fontSize={12}
        fill="#333"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {activity.activityName}
      </SvgText>
    </G>
  );
};

export default TimelineActivity;
