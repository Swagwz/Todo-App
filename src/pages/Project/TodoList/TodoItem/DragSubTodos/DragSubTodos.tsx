import React, { useContext } from "react";

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

import SubTodoDragPreview from "./SubTodoDragPreview";

import { findIndex } from "../../../../../utils/findIndex";
import { useProjectStore } from "../../../../../stores/useProjectStore";

import { TodoContext } from "../../../../../contexts/TodoContext";
import { ProjectContext } from "../../../../../contexts/ProjectContext";
import { useSettingStore } from "../../../../../stores/useSettingStore";

export default function DragSubTodos() {
  const { project } = useContext(ProjectContext);
  const { todo } = useContext(TodoContext);
  const shouldReverse = useSettingStore((s) => s.setting.newest_todo_top);
  const displayed_subTodos = shouldReverse
    ? [...todo.subTodos].reverse()
    : todo.subTodos;
  const update_todo = useProjectStore((s) => s.update_todo);
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = findIndex(todo.subTodos, active.id);
      const newIndex = findIndex(todo.subTodos, over.id);
      const newArr = arrayMove(todo.subTodos, oldIndex, newIndex);
      update_todo(project.id, todo.id, { subTodos: newArr });
    }
  };
  return (
    <Stack gap={0.5}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        key="drag"
      >
        <SortableContext items={todo.subTodos} strategy={rectSortingStrategy}>
          {displayed_subTodos.map((st) => (
            <SubTodoDragPreview key={st.id} subTodo={st} />
          ))}
        </SortableContext>
      </DndContext>
    </Stack>
  );
}
