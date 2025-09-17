import { createContext } from "react";
import type { Todo } from "../types";

interface TodoContextType {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  create: boolean;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  drag: boolean;
  setDrag: React.Dispatch<React.SetStateAction<boolean>>;
  todo: Todo;
}

export const TodoContext = createContext<TodoContextType | null>(null);
