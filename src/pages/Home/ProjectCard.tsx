import { useMemo } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

import {
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

import styles from "./ProjectCard.module.css";
import { getProjectStatus } from "../../configs/projectStatus";
import type { Project, ProjectView } from "../../types";

interface CardInfoWrapperProps {
  children: React.ReactNode;
}

function CardInfoWrapper({ children }: CardInfoWrapperProps) {
  return (
    <Stack direction="row" gap={1}>
      {children}
    </Stack>
  );
}

interface CardInfoTextProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

function CardInfoText({ children, sx }: CardInfoTextProps) {
  return (
    <Typography
      gutterBottom
      sx={{
        fontSize: 14,
        color: "text.secondary",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

interface ProjectCardProps {
  project: Project;
  tab: ProjectView["value"];
}

export default function ProjectCard({ project, tab }: ProjectCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const projectStatus = useMemo(() => getProjectStatus(project), [project]);
  return (
    <Card
      variant="outlined"
      sx={{
        cursor: "pointer",
        transition: "0.3s",
        borderColor: projectStatus.borderColor,
        "&:hover": {
          borderColor: "transparent",
          boxShadow: `0px 0px 10px 1px ${theme.palette.primary.main} `,
        },
      }}
      className={projectStatus.statusCode === 3 ? styles.soon : ""}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <CardContent>
        <Typography
          gutterBottom
          sx={{
            fontSize: 20,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {tab === "all" && project.pinned ? "📌" : ""} {project.title}
        </Typography>

        <CardInfoWrapper>
          <DescriptionOutlinedIcon fontSize="small" />
          <CardInfoText>{project.description || "No description"}</CardInfoText>
        </CardInfoWrapper>

        <CardInfoWrapper>
          <AccessTimeIcon fontSize="small" />
          <CardInfoText>
            {project.deadline
              ? dayjs(project.deadline).fromNow()
              : "No deadline"}
          </CardInfoText>
        </CardInfoWrapper>

        <CardInfoWrapper>
          <InfoOutlineIcon fontSize="small" />
          <CardInfoText
            sx={{
              color: projectStatus.color,
            }}
          >
            {projectStatus.status}
          </CardInfoText>
        </CardInfoWrapper>
      </CardContent>
    </Card>
  );
}
