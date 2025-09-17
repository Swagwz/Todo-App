import { useContext } from "react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import { Stack } from "@mui/material";

import SubTodoDragPreview from "./SubTodoDragPreview";

import { useProjectStore } from "../../../../../stores/useProjectStore";

import { TodoContext } from "../../../../../contexts/TodoContext";
import { ProjectContext } from "../../../../../contexts/ProjectContext";
import { useSettingStore } from "../../../../../stores/useSettingStore";
import type { SubTodo } from "../../../../../types";

export default function DragSubTodos() {
  const todoContext = useContext(TodoContext);
  const projectContext = useContext(ProjectContext);
  if (!todoContext || !projectContext) return null;

  const { project } = projectContext;
  const { todo } = todoContext;
  const shouldReverse = useSettingStore((s) => s.setting.newest_todo_top);
  const displayed_subTodos = shouldReverse
    ? [...todo.subTodos].reverse()
    : todo.subTodos;
  const update_todo = useProjectStore((s) => s.update_todo);
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todo.subTodos.findIndex((st) => st.id === active.id);
      const newIndex = todo.subTodos.findIndex((st) => st.id === over.id);
      const newArr = arrayMove<SubTodo>(todo.subTodos, oldIndex, newIndex);
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
