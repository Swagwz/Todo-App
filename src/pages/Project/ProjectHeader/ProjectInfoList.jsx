import React from "react";
import dayjs from "dayjs";

import { Divider, Stack } from "@mui/material";

import { projectStatus } from "../../../configs/projectStatus";
import ProjectInfoItem from "./ProjectInfoItem";

export default function ProjectInfoList({ project }) {
  const remind_before_str = `${project.remind_before.value} ${
    project.remind_before.value > 1
      ? project.remind_before.unit
      : project.remind_before.unit.slice(0, -1)
  }`;

  return (
    <Stack mt={2} gap={1} divider={<Divider />}>
      <ProjectInfoItem
        title="Description"
        placeholder="No description"
        content={project.description}
      />

      <ProjectInfoItem
        title="Status"
        placeholder="No deadline"
        content={projectStatus(project).status}
        color={projectStatus(project).color}
      />

      <ProjectInfoItem
        title="Deadline"
        placeholder="No deadline"
        content={
          project.deadline &&
          `${dayjs(project.deadline).fromNow()} (${dayjs(
            project.deadline
          ).format("YYYY/MM/DD HH:mm")})`
        }
        color={projectStatus(project).color}
      />

      <ProjectInfoItem
        title="Remind before"
        placeholder="Not set"
        content={remind_before_str}
      />

      <ProjectInfoItem
        title="Create at"
        placeholder="Project created time"
        content={dayjs(project.createAt).format("YYYY/MM/DD HH:mm")}
      />

      <ProjectInfoItem
        title="Last edit at"
        placeholder="Project last edit time"
        content={dayjs(project.updateAt).format("YYYY/MM/DD HH:mm")}
      />
    </Stack>
  );
}
