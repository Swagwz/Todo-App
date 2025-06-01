import { create } from "zustand";
import { DEFAULT_SETTING } from "../configs/defaultSetting";

export const useSettingStore = create((set) => ({
  setting: localStorage.getItem("setting")
    ? JSON.parse(localStorage.getItem("setting"))
    : { ...DEFAULT_SETTING },
  update_setting: (newset) => {
    set((state) => ({ setting: { ...state.setting, ...newset } }));
  },
}));
