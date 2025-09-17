import { useContext, useMemo } from "react";
// eslint-disable-next-line
import { AnimatePresence, motion } from "motion/react";

import { Stack } from "@mui/material";

import TodoItem from "./TodoItem/TodoItem";
import TitleForm from "./TitleForm";
import TodoWrapper from "../../../components/TodoWrapper";
import DragTodos from "./DragTodos/DragTodos";

import { useProjectStore } from "../../../stores/useProjectStore";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { useSettingStore } from "../../../stores/useSettingStore";
import type { Todo } from "../../../types";

export default function TodoList() {
  const context = useContext(ProjectContext);
  if (!context) return null;

  const { create, setCreate, drag, project } = context;
  const create_todo = useProjectStore((s) => s.create_todo);
  const shouldReverse = useSettingStore((s) => s.setting.newest_todo_top);
  const displayed_todos: Todo[] = useMemo(
    () => (shouldReverse ? [...project.todos].reverse() : project.todos),
    [project, shouldReverse]
  );

  /////////////////
  // create TitleForm
  const handleCancel = () => {
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
    create_todo(project.id, newTitle.trim());
    setCreate(false);
  };
  // create TitleForm
  /////////////////
  return (
    <Stack gap={2}>
      <AnimatePresence mode="wait">
        {drag ? (
          <DragTodos />
        ) : (
          <>
            <AnimatePresence mode="wait">
              {create && (
                <motion.div
                  key="todo-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TodoWrapper>
                    <TitleForm {...{ handleCancel, handleSubmit }} />
                  </TodoWrapper>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {displayed_todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </Stack>
  );
}
