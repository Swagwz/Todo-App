import { createContext } from "react";
import type { Project } from "../types";

interface ProjectContextType {
  create: boolean;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  expandAll: boolean;
  setExpandAll: React.Dispatch<React.SetStateAction<boolean>>;
  drag: boolean;
  setDrag: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
}

export const ProjectContext = createContext<ProjectContextType | null>(null);
