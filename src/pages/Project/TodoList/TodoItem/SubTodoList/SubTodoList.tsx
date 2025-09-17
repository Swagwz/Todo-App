import React, { useContext } from "react";

import { Stack } from "@mui/material";

import SubTodoItem from "./SubTodoItem";
import TitleForm from "../../TitleForm";
import Expandable from "../../../../../components/Expandable";
import TodoWrapper from "../../../../../components/TodoWrapper";

import { TodoContext } from "../../../../../contexts/TodoContext";
import { ProjectContext } from "../../../../../contexts/ProjectContext";
import { useProjectStore } from "../../../../../stores/useProjectStore";
import { useSettingStore } from "../../../../../stores/useSettingStore";

export default function SubTodoList() {
  const todoContext = useContext(TodoContext);
  const projectContext = useContext(ProjectContext);
  if (!todoContext || !projectContext) return null;

  const { project } = projectContext;
  const { expand, create, setCreate, setExpand, todo } = todoContext;

  const shouldReverse = useSettingStore((s) => s.setting.newest_todo_top);
  const displayed_subTodos = shouldReverse
    ? [...todo.subTodos].reverse()
    : todo.subTodos;
  const create_subTodo = useProjectStore((s) => s.create_subTodo);

  const handleCancelCreate = () => {
    setCreate(false);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    newTitle: string
  ) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      return;
    }
    create_subTodo(project.id, todo.id, newTitle.trim());
    setCreate(false);
    setExpand(true);
  };

  return (
    <Expandable expand={expand || create}>
      <Stack gap={0.5}>
        {create && (
          <TodoWrapper variant="secondary">
            <TitleForm
              {...{ handleCancel: handleCancelCreate, handleSubmit }}
            />
          </TodoWrapper>
        )}
        {displayed_subTodos.map((st) => (
          <SubTodoItem key={st.id} subTodo={st} />
        ))}
      </Stack>
    </Expandable>
  );
}
