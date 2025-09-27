// Date to minutes
export const getMinutes = (date: Date) => {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
};

// timestamp to minutes
export const parseTime = (t: number) => {
  const date = new Date(Number(t));
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
};

// timestamp to HH : MM
export const formatTime = (timestamp?: number): string => {
  if (!timestamp) return "-";
  const date = new Date(Number(timestamp));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getHours())} : ${pad(date.getMinutes())}`;
};
