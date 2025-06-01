import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

import {
  Checkbox,
  IconButton,
  Stack,
  Typography,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useParams } from "react-router";
import { useProjectStore } from "../../../stores/useProjectStore";

import SubTodoItem from "./SubTodoItem";
import TitleForm from "./TitleForm";
import TodoWrapper from "../../../components/TodoWrapper";
import Expandable from "../../../components/Expandable";
import { useSettingStore } from "../../../stores/useSettingStore";
import ConfirmDialog from "../../../components/ConfirmDialog";

export default function TodoItem({ todo, expandAll }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [expand, setExpand] = useState(false);

  const { id } = useParams();

  const update_todo = useProjectStore((s) => s.update_todo);
  const create_subTodo = useProjectStore((s) => s.create_subTodo);

  const handleCancelEdit = () => {
    setEdit(false);
  };

  const handleTitleChange = (e, newTitle) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      return;
    }
    setEdit(false);
    update_todo(id, todo.id, {
      title: newTitle.trim(),
    });
  };

  const handleCheck = (e) => {
    update_todo(id, todo.id, {
      completed: e.target.checked,
      subTodos: todo.subTodos.map((st) => ({
        ...st,
        completed: e.target.checked,
      })),
    });
  };

  // For TitleForm
  const handleCancelCreate = () => {
    setCreate(false);
  };

  const handleSubmit = (e, newTitle) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      return;
    }
    create_subTodo(id, todo.id, { title: newTitle.trim() });
    setCreate(false);
    setExpand(true);
  };

  useEffect(() => {
    setExpand(expandAll);
  }, [expandAll]);

  return (
    <>
      <motion.div
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TodoWrapper
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            mb: 0.5,
            cursor: "pointer",
            "&:hover": {
              outline: "2px solid",
              outlineColor: "primary.main",
            },
          }}
          onClick={() => {
            setExpand((p) => !p);
          }}
        >
          <Checkbox
            checked={todo.completed}
            onChange={handleCheck}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          {edit ? (
            <TitleForm
              {...{
                origin_title: todo.title,
                handleCancel: handleCancelEdit,
                handleSubmit: handleTitleChange,
              }}
            />
          ) : (
            <>
              <Typography
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {todo.title}
              </Typography>
              <Stack
                sx={{ ml: "auto" }}
                direction="row"
                onClick={(e) => e.stopPropagation()}
              >
                {todo.subTodos.length > 0 && (
                  <IconButton
                    size="small"
                    title={expand ? "fold" : "expand"}
                    onClick={() => setExpand((p) => !p)}
                  >
                    <ExpandLessIcon
                      sx={{
                        rotate: expand ? "0deg" : "180deg",
                        transition: "0.5s",
                      }}
                    />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  title="open menu"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Stack>
            </>
          )}
        </TodoWrapper>

        <Expandable expand={expand || create}>
          <Stack gap={0.5}>
            {create && (
              <TodoWrapper variant="secondary">
                <TitleForm
                  {...{ handleCancel: handleCancelCreate, handleSubmit }}
                />
              </TodoWrapper>
            )}
            {todo.subTodos
              .slice()
              .reverse()
              .map((st) => (
                <SubTodoItem key={st.id} subTodo={st} todo={todo} />
              ))}
          </Stack>
        </Expandable>
      </motion.div>

      <TodoMenu {...{ anchorEl, setAnchorEl, setCreate, setEdit, id, todo }} />
    </>
  );
}

function TodoMenu({ anchorEl, setAnchorEl, setCreate, setEdit, id, todo }) {
  const delete_todo = useProjectStore((s) => s.delete_todo);
  const open = Boolean(anchorEl);
  const ask_before_delete = useSettingStore((s) => s.setting.ask_before_delete);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleCreate = () => {
    setAnchorEl(null);
    setCreate(true);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setEdit(true);
  };

  const handleDelete = () => {
    delete_todo(id, todo.id);
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
