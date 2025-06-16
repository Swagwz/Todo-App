import { projectStatus } from "../configs/projectStatus";

export const PROJECT_FILTERS = {
  all: (projects, shouldReverse) => {
    let pinned = projects.filter((p) => p.pinned);
    let unpinned = projects.filter((p) => !p.pinned);
    if (shouldReverse) unpinned.reverse();

    return [...pinned, ...unpinned];
  },
  completed: (projects) =>
    projects.filter((p) => projectStatus(p).statusCode === 1),
  overdue: (projects) =>
    projects.filter((p) => projectStatus(p).statusCode === 2),
  urgent: (projects) =>
    projects.filter((p) => projectStatus(p).statusCode === 3),
  active: (projects) =>
    projects.filter((p) => projectStatus(p).statusCode === 4),
};
