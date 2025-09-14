import dayjs from "dayjs";
import { useNavigate } from "react-router";

import { Card, CardContent, Stack, Typography, useTheme } from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

import styles from "./ProjectCard.module.css";
import { projectStatus } from "../../configs/projectStatus";

function CardInfoWrapper({ children }) {
  return (
    <Stack direction="row" gap={1}>
      {children}
    </Stack>
  );
}

function CardInfoText({ children, sx }) {
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

export default function ProjectCard({ project, tab }) {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      sx={{
        cursor: "pointer",
        transition: "0.3s",
        borderColor: projectStatus(project).borderColor,
        "&:hover": {
          borderColor: "transparent",
          boxShadow: `0px 0px 10px 1px ${theme.palette.primary.main} `,
        },
      }}
      className={projectStatus(project).statusCode === 3 ? styles.soon : ""}
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
              color: projectStatus(project).color,
            }}
          >
            {projectStatus(project).status}
          </CardInfoText>
        </CardInfoWrapper>
      </CardContent>
    </Card>
  );
}
