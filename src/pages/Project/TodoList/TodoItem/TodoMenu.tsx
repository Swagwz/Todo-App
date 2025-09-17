import { useContext, useState } from "react";

import { ListItemIcon, Menu, MenuItem } from "@mui/material";

import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmDialog from "../../../../components/ConfirmDialog";

import { TodoContext } from "../../../../contexts/TodoContext";
import { ProjectContext } from "../../../../contexts/ProjectContext";

import { useProjectStore } from "../../../../stores/useProjectStore";
import { useSettingStore } from "../../../../stores/useSettingStore";

export default function TodoMenu() {
  const todoContext = useContext(TodoContext);
  const projectContext = useContext(ProjectContext);
  if (!todoContext || !projectContext) return null;

  const { anchorEl, setAnchorEl, setEdit, setCreate, setDrag, todo } =
    todoContext;
  const { project } = projectContext;

  const [openConfirm, setOpenConfirm] = useState(false);
  const delete_todo = useProjectStore((s) => s.delete_todo);
  const ask_before_delete = useSettingStore((s) => s.setting.ask_before_delete);
  const open = Boolean(anchorEl);

  const handleCreate = () => {
    setAnchorEl(null);
    setCreate(true);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setEdit(true);
  };

  const handleDrag = () => {
    setDrag((p) => !p);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    delete_todo(project.id, todo.id);
    setAnchorEl(null);
  };

  const handleClickDelete = () => {
    if (ask_before_delete) {
      setOpenConfirm(true);
    } else handleDelete();
  };

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleCreate}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Create
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        {todo.subTodos.length >= 2 && (
          <MenuItem onClick={handleDrag}>
            <ListItemIcon>
              <SortIcon fontSize="small" />
            </ListItemIcon>
            Sort
          </MenuItem>
        )}
        <MenuItem sx={{ color: "error.main" }} onClick={handleClickDelete}>
          <ListItemIcon>
            <DeleteIcon sx={{ color: "error.main" }} fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      <ConfirmDialog
        {...{
          open: openConfirm,
          setOpen: setOpenConfirm,
          title: "Delete todo",
          onConfirm: handleDelete,
        }}
      />
    </>
  );
}
