import React, { useContext, useMemo } from "react";

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

import { findIndex } from "../../../../utils/findIndex";
import { ProjectContext } from "../../../../contexts/ProjectContext";
import { useProjectStore } from "../../../../stores/useProjectStore";
import TodoDragPreview from "./TodoDragPreview";
import { useSettingStore } from "../../../../stores/useSettingStore";

export default function DragTodos() {
  const { project } = useContext(ProjectContext);
  const update_project = useProjectStore((s) => s.update_project);
  const shouldReverse = useSettingStore((s) => s.setting.newest_todo_top);
  const displayed_todos = useMemo(
    () => (shouldReverse ? [...project.todos].reverse() : project.todos),
    [project, shouldReverse]
  );
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
