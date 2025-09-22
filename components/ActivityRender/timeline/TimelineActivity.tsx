import { Activity } from "@/types/Activity";
import { parseTime } from "@/utils/parseTime";
import { describeArc, polarToCartesian } from "@/utils/timeLine";
import { useState } from "react";
import { View } from "react-native";
import Svg, { ClipPath, Path, Rect, Text as SvgText } from "react-native-svg";

interface TimelineActivityProps {
  activity: Activity;
  cx: number;
  cy: number;
  r: number;
  hovered: boolean;
  onHover: (id: string | null) => void;
  currentMinutes: number | null;
}

export default function TimelineActivity({
  activity,
  cx,
  cy,
  r,
  hovered,
  onHover,
  currentMinutes,
}: TimelineActivityProps) {
  const [localHovered, setLocalHovered] = useState(false); // Local hover state for touch events

  const start = parseTime(activity.startTime);
  const end =
    activity.source === "log" && !activity.endTime && currentMinutes !== null
      ? currentMinutes
      : parseTime(activity.endTime || activity.startTime);

  const adjustedEnd = end < start ? end + 1440 : end;
  const mid = (start + adjustedEnd) / 2;
  const midMinutes = mid % 1440;

  const textPos = polarToCartesian(cx, cy, midMinutes, r * 0.6);

  const fillColor =
    activity.source === "plan"
      ? "rgba(234, 179, 8, 1)"
      : "rgba(34, 197, 94, 1)";

  const strokeDasharray =
    activity.source === "log" && !activity.endTime ? "4 4" : undefined;

  const radius = r + (localHovered ? 10 : 0); // Increase the radius when hovered
  const arcPath = describeArc(cx, cy, start, end, radius);

  const textLength = activity.activityName.length * 9;
  const textHeight = 14;

  // Touch event handlers
  const handlePressIn = () => {
    setLocalHovered(true);
    onHover(activity.id);
  };

  const handlePressOut = () => {
    setLocalHovered(false);
    onHover(null);
  };

  return (
    <View>
      <Svg height="100%" width="100%">
        <Path
          d={arcPath}
          fill={fillColor}
          stroke="rgba(0,0,0,1)"
          strokeWidth={1}
          strokeDasharray={strokeDasharray}
        />

        <ClipPath id={`clip-${activity.id}`}>
          <Path d={arcPath} />
        </ClipPath>

        {localHovered && (
          <Rect
            x={textPos.x - textLength / 2 - 2}
            y={textPos.y - textHeight / 2}
            width={textLength + 4}
            height={textHeight}
            fill="rgba(255,255,255,0.8)"
            rx={2}
          />
        )}

        <SvgText
          clipPath={localHovered ? undefined : `url(#clip-${activity.id})`}
          x={textPos.x}
          y={textPos.y}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="12"
          fill="#333"
        >
          {activity.activityName}
        </SvgText>

        {/* Touchable for hover effect */}
        <View
          style={{
            position: "absolute",
            left: textPos.x - 30,
            top: textPos.y - 30,
            width: 60,
            height: 60,
          }}
          onTouchStart={handlePressIn}
          onTouchEnd={handlePressOut}
        />
      </Svg>
    </View>
  );
}
