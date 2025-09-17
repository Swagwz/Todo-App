import { create } from "zustand";
import { DEFAULT_SETTING } from "../configs/defaultSetting";
import type { Setting } from "../types";

interface SettingStore {
  setting: Setting;
  update_setting: (new_setting: Partial<Setting>) => void;
}

export const useSettingStore = create<SettingStore>()((set) => ({
  setting: localStorage.getItem("setting")
    ? JSON.parse(localStorage.getItem("setting") || "")
    : { ...DEFAULT_SETTING },

  update_setting: (new_setting) => {
    set((state) => {
      const updated = { ...state.setting, ...new_setting };
      localStorage.setItem("setting", JSON.stringify(updated));
      return { setting: updated };
    });
  },
}));
