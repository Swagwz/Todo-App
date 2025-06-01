import React, { useState } from "react";
import { useParams } from "react-router";

import { Checkbox, IconButton, Stack, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useProjectStore } from "../../../stores/useProjectStore";
import TodoWrapper from "../../../components/TodoWrapper";
import TitleForm from "./TitleForm";
import { useSettingStore } from "../../../stores/useSettingStore";
import ConfirmDialog from "../../../components/ConfirmDialog";

export default function SubTodoItem({ subTodo: st, todo }) {
  const [edit, setEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const { id } = useParams();
  const update_subTodo = useProjectStore((s) => s.update_subTodo);
  const delete_subTodo = useProjectStore((s) => s.delete_subTodo);
  const ask_before_delete = useSettingStore((s) => s.setting.ask_before_delete);

  const handleCheck = (e, st) => {
    update_subTodo(id, todo.id, st.id, {
      completed: e.target.checked,
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
    delete_subTodo(id, todo.id, st.id);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleTitleChange = (e, newTitle) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    update_subTodo(id, todo.id, st.id, { title: newTitle.trim() });
    setEdit(false);
  };

  return (
    <>
      <TodoWrapper variant="secondary">
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <Checkbox
            checked={st.completed}
            onChange={(e) => handleCheck(e, st)}
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
