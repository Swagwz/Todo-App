import { useEffect, useState } from "react";
import { useParams } from "react-router";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Paper } from "@mui/material";

import { useProjectStore } from "../../stores/useProjectStore";
import { useSettingStore } from "../../stores/useSettingStore";

import NotFound from "../NotFound";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import TodoList from "./TodoList/TodoList";
import ProjectActions from "./ProjectActions";
import { ProjectContext } from "../../contexts/ProjectContext";

export default function Project() {
  const [create, setCreate] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  const [drag, setDrag] = useState(false);
  const setting_expand_all = useSettingStore((s) => s.setting.expand_all);

  const { id } = useParams();
  const project = useProjectStore((s) => s.get_project(id || ""));

  useEffect(() => {
    setCreate(false);
    setExpandAll(setting_expand_all);
  }, [id, setting_expand_all]);

  if (!project) {
    return <NotFound />;
  }

  const contextValue = {
    create,
    setCreate,
    expandAll,
    setExpandAll,
    drag,
    setDrag,
    project,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      <Paper sx={{ p: 2 }}>
        <ProjectHeader />
        <ProjectActions />
        <TodoList />
      </Paper>
    </ProjectContext.Provider>
  );
}
