import { projectStatus } from "../configs/projectStatus";

export const PROJECT_FILTERS = {
  all: (projects) => [
    ...projects.filter((p) => p.pinned),
    ...projects.filter((p) => !p.pinned),
  ],
  completed: (projects) =>
    projects.filter((p) => projectStatus(p).statusCode === 1),
  overdue: (projects) =>
    projects.filter((p) => projectStatus(p).statusCode === 2),
  urgent: (projects) =>
    projects.filter((p) => projectStatus(p).statusCode === 3),
  active: (projects) =>
    projects.filter((p) => projectStatus(p).statusCode === 4),
};
