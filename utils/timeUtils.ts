// Date to minutes
export const getCurrentMinutes = (date: Date) => {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
};

// timestamp string to minutes
export const parseTime = (t: string) => {
  const date = new Date(Number(t));
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
};
