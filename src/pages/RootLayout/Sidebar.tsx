import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";

import { useProjectStore } from "../../stores/useProjectStore";
import { getProjectStatus } from "../../configs/projectStatus";
import { PROJECT_FILTERS } from "../../configs/projectFilters";
import { PROJECT_VIEWS } from "../../configs/projectViews";
import { useSettingStore } from "../../stores/useSettingStore";
import type { OpenStateProps, Project, ProjectView } from "../../types";

type SidebarProps = OpenStateProps & {
  handleSettingOpen: () => void;
};

export default function Sidebar({
  open,
  setOpen,
  handleSettingOpen,
}: SidebarProps) {
  const [tab, setTab] = useState<ProjectView["value"]>("all");

  const projects = useProjectStore((s) => s.projects);
  const shouldReverse = useSettingStore((s) => s.setting.newest_project_top);

  const filteredProjects: Project[] = useMemo(() => {
    const filterFn = PROJECT_FILTERS[tab] || PROJECT_FILTERS["all"];
    return filterFn(projects, shouldReverse);
  }, [tab, projects, shouldReverse]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newTab = e.target.value;
    let isValid = PROJECT_VIEWS.some((data) => data.value === newTab);
    if (!isValid) return;
    setTab(newTab as ProjectView["value"]);
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: 250 } } }}
      >
        <Stack direction="row" sx={{ alignItems: "center", py: 1, px: 2 }}>
          <TextField
            select
            value={tab}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            size="small"
            sx={{ "& fieldset": { border: "none" } }}
          >
            {PROJECT_VIEWS.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>

          <IconButton
            sx={{ ml: "auto" }}
            onClick={() => setOpen(false)}
            title="close sidebar"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <List sx={{ gap: 1, flexGrow: 1, overflow: "auto" }}>
          {filteredProjects.length > 0 ? (
            (shouldReverse && tab !== "all"
              ? [...filteredProjects].reverse()
              : filteredProjects
            ).map((project) => (
              <SidebarListItem
                {...{ tab, project, setOpen }}
                key={project.id}
              />
            ))
          ) : (
            <Typography sx={{ textAlign: "center" }}>No projects</Typography>
          )}
        </List>
        <Divider />
        <Stack direction="row" sx={{ alignItems: "center", py: 1, px: 2 }}>
          <div>Setting</div>
          <IconButton
            sx={{ ml: "auto" }}
            onClick={handleSettingOpen}
            title="open setting"
          >
            <SettingsIcon />
          </IconButton>
        </Stack>
      </Drawer>
    </>
  );
}

type SidebarListItemProps = Pick<OpenStateProps, "setOpen"> & {
  project: Project;
  tab: ProjectView["value"];
};

function SidebarListItem({ project, setOpen, tab }: SidebarListItemProps) {
  const navigate = useNavigate();

  const handleRouting = (id: string) => {
    navigate(`/project/${id}`);
    setOpen(false);
  };

  const projectStatus = getProjectStatus(project);

  return (
    <ListItem
      key={project.id}
      disablePadding
      onClick={() => handleRouting(project.id)}
      sx={{
        color: "text.primary",
        "&:hover": { color: "primary.main" },
      }}
    >
      <ListItemButton>
        <ListItemText
          primary={`${tab === "all" && project.pinned ? "📌" : ""} ${
            project.title
          }`}
          secondary={projectStatus.status}
          sx={{
            borderRight: "5px solid",
            borderRightColor: projectStatus.borderColor,
          }}
          slotProps={{
            primary: {
              sx: {
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              },
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
