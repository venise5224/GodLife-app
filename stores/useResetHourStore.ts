import { create } from "zustand";

interface ResetHourState {
  resetHour: number; // 0~23
  setResetHour: (hour: number) => void;
}

export const useResetHourStore = create<ResetHourState>((set) => ({
  resetHour: 0, // 기본값 0시
  setResetHour: (hour) => set({ resetHour: hour }),
}));
