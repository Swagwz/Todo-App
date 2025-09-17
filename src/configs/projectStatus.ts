import type { TypographyProps } from "@mui/material";
import type { Project } from "../types";
import { isOverdue, isUrgent } from "../utils/checkTime";

interface ProjectStatus {
  statusCode: 0 | 1 | 2 | 3 | 4;
  status: string;
  color: TypographyProps["color"];
  borderColor: string;
}

export function getProjectStatus(project: Project): ProjectStatus {
  if (project.todos.length === 0)
    return {
      statusCode: 0,
      status: "No todos",
      color: "text.secondary",
      borderColor: "",
    };
  else if (project.completed)
    return {
      statusCode: 1,
      status: "Completed",
      color: "success.main",
      borderColor: "success.main",
    };
  else if (isOverdue(project.deadline))
    return {
      statusCode: 2,
      status: "Deadline has passed",
      color: "error.main",
      borderColor: "error.main",
    };
  else if (isUrgent(project.deadline, project.remind_before))
    return {
      statusCode: 3,
      status: "Deadline is approaching",
      color: "warning.main",
      borderColor: "warning.main",
    };
  else
    return {
      statusCode: 4,
      status: "Active",
      color: "info.main",
      borderColor: "",
    };
}
