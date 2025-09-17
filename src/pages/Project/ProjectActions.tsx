import { useContext } from "react";

import { IconButton, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SortIcon from "@mui/icons-material/Sort";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { ProjectContext } from "../../contexts/ProjectContext";

export default function ProjectActions() {
  const context = useContext(ProjectContext);
  if (!context) return null;

  const { create, setCreate, expandAll, setExpandAll, drag, setDrag } = context;

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

  return (
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
  );
}
