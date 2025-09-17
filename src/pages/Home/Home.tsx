import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import { useProjectStore } from "../../stores/useProjectStore";
import ProjectCard from "./ProjectCard";
import NoProject from "./NoProject";
import { PROJECT_VIEWS } from "../../configs/projectViews";
import { PROJECT_FILTERS } from "../../configs/projectFilters";
import { useSettingStore } from "../../stores/useSettingStore";
import type { ProjectView } from "../../types";

export default function Home() {
  const [tab, setTab] = useState<ProjectView["value"]>("all");
  const shouldReverse = useSettingStore((s) => s.setting.newest_project_top);

  const update_setting = useSettingStore((s) => s.update_setting);

  const projects = useProjectStore((s) => s.projects);
  const delete_project = useProjectStore((s) => s.delete_project);

  const location = useLocation();

  const filteredProjects = useMemo(() => {
    const filterFn = PROJECT_FILTERS[tab] ?? PROJECT_FILTERS["all"];
    return filterFn(projects, shouldReverse);
  }, [tab, projects, shouldReverse]);

  const handleSort = () => {
    let prev = shouldReverse;
    update_setting({ newest_project_top: !prev });
  };

  useEffect(() => {
    if (location.state) {
      const { id, shouldDelete } = location.state;
      shouldDelete && delete_project(id);
    }
  }, []);

  if (projects.length === 0) return <NoProject />;

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Stack gap={2}>
          <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
            <FilterAltIcon />
            <Stack
              gap={1}
              direction="row"
              sx={{ overflow: "auto", py: 1, px: 2 }}
            >
              {PROJECT_VIEWS.map(({ value, label, color }) => (
                <Chip
                  key={value}
                  label={label}
                  color={tab === value ? color : "default"}
                  onClick={() => setTab(value)}
                />
              ))}
            </Stack>
          </Stack>
          <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
            <SwapVertIcon onClick={handleSort} sx={{ cursor: "pointer" }} />
            Currently : {shouldReverse ? "Newest top" : "Oldest top"}
          </Stack>
          {filteredProjects.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 1,
              }}
            >
              {(shouldReverse && tab !== "all"
                ? [...filteredProjects].reverse()
                : filteredProjects
              ).map((project) => (
                <ProjectCard {...{ tab, project }} key={project.id} />
              ))}
            </Box>
          ) : (
            <Typography sx={{ textAlign: "center", fontSize: 28 }}>
              No projects
            </Typography>
          )}
        </Stack>
      </Paper>
    </>
  );
}
