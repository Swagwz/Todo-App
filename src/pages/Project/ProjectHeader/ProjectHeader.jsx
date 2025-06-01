import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  Divider,
  IconButton,
  Stack,
  Typography,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EditProjectDialog from "./EditProjectDialog";
import ProjectInfoList from "./ProjectInfoList";
import Expandable from "../../../components/Expandable";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useProjectStore } from "../../../stores/useProjectStore";

export default function ProjectHeader({ project }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);

  const update = useProjectStore((s) => s.update_project);

  const { id } = useParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePin = () => {
    update(id, { pinned: !project.pinned });
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handlePin}
          sx={{ position: "absolute", top: 0, left: 0 }}
          title={project.pinned ? "unpin" : "pin"}
        >
          {project.pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
        </IconButton>
        <Typography
          sx={{
            fontSize: 28,
            flexGrow: 1,
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            mx: 8,
          }}
        >
          {project.title}
        </Typography>
        <IconButton
          onClick={handleClick}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <MoreVertIcon />
        </IconButton>
      </Stack>

      <Expandable expand={show}>
        <ProjectInfoList project={project} />
      </Expandable>

      <Divider sx={{ my: 2 }}>
        <IconButton
          onClick={() => setShow((prev) => !prev)}
          title={`show ${show ? "less" : "more"}`}
        >
          <ExpandLessIcon sx={{ rotate: show ? "0deg" : "180deg" }} />
        </IconButton>
      </Divider>

      <ProjectMenu {...{ anchorEl, setAnchorEl, setEdit, id }} />

      {edit && (
        <EditProjectDialog
          {...{ open: edit, setOpen: setEdit, project_data: project }}
        />
      )}
    </>
  );
}

function ProjectMenu({ anchorEl, setAnchorEl, setEdit, id }) {
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpenEdit = () => {
    setEdit(true);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    navigate("/", { replace: true, state: { shouldDelete: true, id } });
  };

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleOpenEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => setOpenDialog(true)}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      <ConfirmDialog
        {...{
          open: openDialog,
          setOpen: setOpenDialog,
          title: "Delete project",
          onConfirm: handleDelete,
        }}
      />
    </>
  );
}
