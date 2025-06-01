import { AnimatePresence, motion } from "motion/react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import { Stack } from "@mui/material";

import TodoItem from "./TodoItem";
import TitleForm from "./TitleForm";
import TodoWrapper from "../../../components/TodoWrapper";

import { useProjectStore } from "../../../stores/useProjectStore";
import TodoItemDragView from "./TodoItemDragView";

function findIndex(todos, target_id) {
  let index = -1;

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id === target_id) {
      index = i;
    }
  }

  return index;
}

export default function TodoList({
  create,
  setCreate,
  expandAll,
  project,
  drag,
}) {
  const create_todo = useProjectStore((s) => s.create_todo);
  const update_project = useProjectStore((s) => s.update_project);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = findIndex(project.todos, active.id);
      const newIndex = findIndex(project.todos, over.id);
      const newArr = arrayMove(project.todos, oldIndex, newIndex);
      update_project(project.id, { todos: newArr });
    }
  };

  // For TitleForm
  const handleCancel = () => {
    setCreate(false);
  };

  const handleSubmit = (e, newTitle) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      return;
    }
    create_todo(project.id, { title: newTitle.trim() });
    setCreate(false);
  };

  return (
    <Stack gap={2}>
      <AnimatePresence mode="wait">
        {drag ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            key="drag"
          >
            <SortableContext
              items={project.todos}
              strategy={rectSortingStrategy}
            >
              {project.todos.map((todo) => (
                <TodoItemDragView key={todo.id} todo={todo} />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <>
            <AnimatePresence mode="wait">
              {create && (
                <motion.div
                  key="todo-form"
                  initial={{ x: 10, opacity: 0, height: 0 }}
                  animate={{ x: 0, opacity: 1, height: "auto" }}
                  exit={{ x: -100, opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <TodoWrapper>
                    <TitleForm {...{ handleCancel, handleSubmit }} />
                  </TodoWrapper>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {project.todos.map((todo) => (
                <TodoItem key={todo.id} {...{ todo, expandAll }} />
              ))}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </Stack>
  );
}
