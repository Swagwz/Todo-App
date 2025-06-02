import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { useProjectStore } from "../../stores/useProjectStore";
import ProjectCard from "./ProjectCard";
import NoProject from "./NoProject";
import { PROJECT_VIEWS } from "../../configs/projectViews";
import { PROJECT_FILTERS } from "../../configs/projectFilters";

export default function Home() {
  const [tab, setTab] = useState("all");
  const projects = useProjectStore((s) => s.projects);
  const delete_project = useProjectStore((s) => s.delete_project);
  const location = useLocation();

  const filteredProjects = useMemo(() => {
    const filterFn = PROJECT_FILTERS[tab] ?? PROJECT_FILTERS["all"];
    return filterFn(projects);
  }, [tab, projects]);

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
        <Stack direction="row" gap={1} sx={{ mb: 2, alignItems: "center" }}>
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
                value={value}
                color={tab === value ? color : "default"}
                onClick={() => setTab(value)}
              />
            ))}
          </Stack>
        </Stack>
        {filteredProjects.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 1,
            }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard {...{ tab, project }} key={project.id} />
            ))}
          </Box>
        ) : (
          <Typography sx={{ textAlign: "center", fontSize: 28 }}>
            No projects
          </Typography>
        )}
      </Paper>
    </>
  );
}
