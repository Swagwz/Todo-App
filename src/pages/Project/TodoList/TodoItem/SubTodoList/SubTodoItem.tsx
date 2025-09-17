import React, { useContext, useState } from "react";

import { Checkbox, IconButton, Stack, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useProjectStore } from "../../../../../stores/useProjectStore";
import { useSettingStore } from "../../../../../stores/useSettingStore";

import TitleForm from "../../TitleForm";
import TodoWrapper from "../../../../../components/TodoWrapper";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import { TodoContext } from "../../../../../contexts/TodoContext";
import { ProjectContext } from "../../../../../contexts/ProjectContext";
import type { SubTodo } from "../../../../../types";

interface SubTodoItemProps {
  subTodo: SubTodo;
}

export default function SubTodoItem({ subTodo: st }: SubTodoItemProps) {
  const todoContext = useContext(TodoContext);
  const projectContext = useContext(ProjectContext);
  if (!todoContext || !projectContext) return null;

  const { todo } = todoContext;
  const { project } = projectContext;
  const [edit, setEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const update_subTodo = useProjectStore((s) => s.update_subTodo);
  const delete_subTodo = useProjectStore((s) => s.delete_subTodo);
  const ask_before_delete = useSettingStore((s) => s.setting.ask_before_delete);

  const handleCheck = (checked: boolean) => {
    update_subTodo(project.id, todo.id, st.id, {
      completed: checked,
    });
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleClickDelete = () => {
    if (ask_before_delete) {
      setOpenConfirm(true);
    } else handleDelete();
  };

  const handleDelete = () => {
    delete_subTodo(project.id, todo.id, st.id);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleTitleChange = (
    e: React.FormEvent<HTMLFormElement>,
    newTitle: string
  ) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    update_subTodo(project.id, todo.id, st.id, { title: newTitle.trim() });
    setEdit(false);
  };

  return (
    <>
      <TodoWrapper variant="secondary">
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <Checkbox
            checked={st.completed}
            onChange={(_, checked) => handleCheck(checked)}
          />
          {edit ? (
            <TitleForm
              {...{
                origin_title: st.title,
                handleCancel,
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
                {st.title}
              </Typography>
              <Stack sx={{ ml: "auto" }} direction="row">
                <IconButton
                  size="small"
                  title="edit title"
                  onClick={handleEdit}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  title="delete subTodo"
                  sx={{ color: "error.main" }}
                  onClick={handleClickDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </>
          )}
        </Stack>
      </TodoWrapper>
      <ConfirmDialog
        {...{
          open: openConfirm,
          setOpen: setOpenConfirm,
          title: "Delete subTodo",
          onConfirm: handleDelete,
        }}
      />
    </>
  );
}
