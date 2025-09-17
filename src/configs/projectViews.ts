import type { ProjectView } from "../types";

export const PROJECT_VIEWS: ProjectView[] = [
  { value: "all", label: "All", title: "All projects", color: "primary" },
  { value: "active", label: "Active", title: "Working on", color: "info" },
  {
    value: "urgent",
    label: "Urgent",
    title: "No time to waste",
    color: "warning",
  },

  { value: "overdue", label: "Overdue", title: "Time up", color: "error" },
  {
    value: "completed",
    label: "Completed",
    title: "Finished",
    color: "success",
  },
];
