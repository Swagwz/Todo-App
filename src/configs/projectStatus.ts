import { isOverdue, isUrgent } from "../utils/checkTime";

export function projectStatus(project) {
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
