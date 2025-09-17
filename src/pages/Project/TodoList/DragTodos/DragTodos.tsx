import React, { useContext, useMemo } from "react";

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

import { ProjectContext } from "../../../../contexts/ProjectContext";
import { useProjectStore } from "../../../../stores/useProjectStore";
import { useSettingStore } from "../../../../stores/useSettingStore";
import TodoDragPreview from "./TodoDragPreview";
import type { Todo } from "../../../../types";

export default function DragTodos() {
  const context = useContext(ProjectContext);
  if (!context) return null;

  const { project } = context;
  const update_project = useProjectStore((s) => s.update_project);
  const shouldReverse = useSettingStore((s) => s.setting.newest_todo_top);
  const displayed_todos: Todo[] = useMemo(
    () => (shouldReverse ? [...project.todos].reverse() : project.todos),
    [project, shouldReverse]
  );
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = project.todos.findIndex((todo) => todo.id === active.id);
      const newIndex = project.todos.findIndex((todo) => todo.id === over.id);
      const newArr = arrayMove(project.todos, oldIndex, newIndex);
      update_project(project.id, { todos: newArr });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      key="drag"
    >
      <SortableContext items={project.todos} strategy={rectSortingStrategy}>
        {displayed_todos.map((todo) => (
          <TodoDragPreview key={todo.id} todo={todo} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
