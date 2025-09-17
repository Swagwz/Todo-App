import type { Setting, SettingKey } from "../types";

export const DEFAULT_SETTING: Setting = {
  dark_mode: true,
  expand_all: false,
  ask_before_delete: true,
  newest_project_top: true,
  newest_todo_top: true,
  remind_before: {
    value: 3,
    unit: "days",
  },
};

export const Bool_Setting: [SettingKey, Setting[SettingKey]][] = Object.entries(
  DEFAULT_SETTING
).filter(([_, value]) => typeof value === "boolean") as [
  SettingKey,
  Setting[SettingKey]
][];
