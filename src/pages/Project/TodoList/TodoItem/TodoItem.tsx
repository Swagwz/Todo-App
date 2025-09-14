import React, { useContext, useEffect, useState } from "react";
// eslint-disable-next-line
import { motion } from "motion/react";

import { Checkbox } from "@mui/material";

import TitleForm from "../TitleForm";
import TodoItemMain from "./TodoItemMain";
import SubTodoList from "./SubTodoList/SubTodoList";
import TodoMenu from "./TodoMenu";
import TodoWrapper from "../../../../components/TodoWrapper";

import { useProjectStore } from "../../../../stores/useProjectStore";
import { ProjectContext } from "../../../../contexts/ProjectContext";
import { TodoContext } from "../../../../contexts/TodoContext";
import DragSubTodos from "./DragSubTodos/DragSubTodos";

export default function TodoItem({ todo }) {
  const { expandAll, project } = useContext(ProjectContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [expand, setExpand] = useState(false);
  const [drag, setDrag] = useState(false);

  const update_todo = useProjectStore((s) => s.update_todo);

  const contextValue = {
    anchorEl,
    setAnchorEl,
    edit,
    setEdit,
    create,
    setCreate,
    expand,
    setExpand,
    drag,
    setDrag,
    todo,
  };

  const handleCheck = (e) => {
    update_todo(project.id, todo.id, {
      completed: e.target.checked,
      subTodos: todo.subTodos.map((st) => ({
        ...st,
        completed: e.target.checked,
      })),
    });
  };

  // edit TitleForm
  const handleCancelEdit = () => {
    setEdit(false);
  };

  const handleTitleChange = (e, newTitle) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      return;
    }
    setEdit(false);
    update_todo(project.id, todo.id, {
      title: newTitle.trim(),
    });
  };
  // edit TitleForm

  useEffect(() => {
    setExpand(expandAll);
  }, [expandAll]);

  return (
    <TodoContext.Provider value={contextValue}>
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
            if (drag) return;
            setExpand((p) => !p);
          }}
        >
          <Checkbox
            checked={todo.completed}
            onChange={handleCheck}
            onClick={(e) => {
              e.stopPropagation();
            }}
            disabled={drag}
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
            <TodoItemMain />
          )}
        </TodoWrapper>
        {drag ? <DragSubTodos /> : <SubTodoList />}
      </motion.div>

      <TodoMenu />
    </TodoContext.Provider>
  );
}
