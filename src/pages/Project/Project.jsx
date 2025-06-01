import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Paper, IconButton, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SortIcon from "@mui/icons-material/Sort";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import { useProjectStore } from "../../stores/useProjectStore";

import NotFound from "../NotFound";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import TodoList from "./TodoList/TodoList";
import { useSettingStore } from "../../stores/useSettingStore";

export default function Project() {
  const [create, setCreate] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  const [drag, setDrag] = useState(false);
  const setting_expand_all = useSettingStore((s) => s.setting.expand_all);

  const { id } = useParams();
  const project = useProjectStore((s) => s.get_project(id));

  // For ProjectAction
  const handleCreate = () => {
    setCreate((prev) => !prev);
  };

  const handleExpandAll = () => {
    setExpandAll((prev) => !prev);
  };

  const handleDrag = () => {
    setDrag((p) => !p);
  };

  useEffect(() => {
    setCreate(false);
    setExpandAll(setting_expand_all);
  }, [id, setting_expand_all]);

  if (!project) {
    return <NotFound />;
  }

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <ProjectHeader project={project} />

        <Stack direction="row" sx={{ justifyContent: "end" }}>
          <IconButton
            title={create ? "cancel create" : "create new todo"}
            onClick={handleCreate}
            disabled={drag}
          >
            {create ? <RemoveIcon /> : <AddIcon />}
          </IconButton>

          <IconButton
            title={`${expandAll ? "fold" : "expand"} all`}
            onClick={handleExpandAll}
            disabled={drag}
          >
            {expandAll ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>

          <IconButton title="sort todos" onClick={handleDrag}>
            <SortIcon />
          </IconButton>
        </Stack>

        <TodoList {...{ create, setCreate, expandAll, project, drag }} />
      </Paper>
    </>
  );
}
