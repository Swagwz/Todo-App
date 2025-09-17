import type { Project, ProjectView } from "./../types";
import { getProjectStatus } from "../configs/projectStatus";

export const PROJECT_FILTERS: Record<
  ProjectView["value"],
  (projects: Project[], shouldReverse: boolean) => Project[]
> = {
  all: (projects, shouldReverse) => {
    let pinned = projects.filter((p) => p.pinned);
    let unpinned = projects.filter((p) => !p.pinned);
    if (shouldReverse) unpinned.reverse();

    return [...pinned, ...unpinned];
  },
  completed: (projects) =>
    projects.filter((p) => getProjectStatus(p).statusCode === 1),
  overdue: (projects) =>
    projects.filter((p) => getProjectStatus(p).statusCode === 2),
  urgent: (projects) =>
    projects.filter((p) => getProjectStatus(p).statusCode === 3),
  active: (projects) =>
    projects.filter((p) => getProjectStatus(p).statusCode === 4),
};
