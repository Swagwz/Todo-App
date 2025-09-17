import dayjs from "dayjs";

import {
  Divider,
  Box,
  Stack,
  Typography,
  type TypographyProps,
} from "@mui/material";

import { getProjectStatus } from "../../../configs/projectStatus";
import type { Project } from "../../../types";

interface ProjectInfoListProps {
  project: Project;
}

export default function ProjectInfoList({ project }: ProjectInfoListProps) {
  const remind_before_str = `${project.remind_before.value} ${
    project.remind_before.value > 1
      ? project.remind_before.unit
      : project.remind_before.unit.slice(0, -1)
  }`;

  const projectStatus = getProjectStatus(project);

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
        content={projectStatus.status}
        color={projectStatus.color}
      />

      <ProjectInfoItem
        title="Deadline"
        placeholder="No deadline"
        content={
          project.deadline
            ? `${dayjs(project.deadline).fromNow()} (${dayjs(
                project.deadline
              ).format("YYYY/MM/DD HH:mm")})`
            : ""
        }
        color={projectStatus.color}
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

interface ProjectInfoItemProps {
  title: string;
  placeholder: string;
  content: string;
  color?: TypographyProps["color"];
}

function ProjectInfoItem({
  title,
  placeholder,
  content,
  color,
}: ProjectInfoItemProps) {
  return (
    <Stack direction="row" color="text.main" sx={{ flexWrap: "wrap" }}>
      <Box sx={{ width: 150 }}>{title}</Box>
      {content ? (
        <Typography
          color={color || "text.secondary"}
          sx={{
            flex: "1 0 300px",
            overflowWrap: "anywhere",
          }}
        >
          {content}
        </Typography>
      ) : (
        <Typography color="text.disabled" sx={{ flex: "1 0 300px" }}>
          {placeholder}
        </Typography>
      )}
    </Stack>
  );
}
