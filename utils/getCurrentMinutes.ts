export const getCurrentMinutes = (date: Date) => {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
};
