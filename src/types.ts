import type { ChipProps } from "@mui/material";
import type { Dayjs } from "dayjs";
import type { Dispatch, SetStateAction } from "react";

export interface ProjectView {
  value: "all" | "active" | "urgent" | "overdue" | "completed";
  label: Capitalize<ProjectView["value"]>;
  title: string;
  color: ChipProps["color"];
}

export interface RemindBefore {
  value: number;
  unit: "minutes" | "hours" | "days" | "weeks" | "months";
}

export interface Setting {
  dark_mode: boolean;
  expand_all: boolean;
  ask_before_delete: boolean;
  newest_project_top: boolean;
  newest_todo_top: boolean;
  remind_before: RemindBefore;
}

export type SettingKey = keyof Omit<Setting, "remind_before">;

export interface Project {
  id: string;
  title: string;
  description: string;
  deadline: Date | Dayjs | null;
  remind_before: RemindBefore;
  createAt: number;
  updateAt: number;
  completed: boolean;
  pinned: boolean;
  todos: Todo[];
}

export type Todo = SubTodo & {
  subTodos: SubTodo[];
};

export interface SubTodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface OpenStateProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
