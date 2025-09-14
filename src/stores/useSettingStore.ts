import { create } from "zustand";
import { DEFAULT_SETTING } from "../configs/defaultSetting";

export const useSettingStore = create((set) => ({
  setting: localStorage.getItem("setting")
    ? JSON.parse(localStorage.getItem("setting"))
    : { ...DEFAULT_SETTING },
  update_setting: (new_setting) => {
    set((state) => {
      const updated = { ...state.setting, ...new_setting };
      localStorage.setItem("setting", JSON.stringify(updated));
      return { setting: updated };
    });
  },
}));
