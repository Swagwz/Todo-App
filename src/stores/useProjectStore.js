import { create } from "zustand";

export const useProjectStore = create((set, get) => ({
  projects: localStorage.getItem("projects")
    ? JSON.parse(localStorage.getItem("projects"))
    : [],

  create_project: (data) => {
    let id = crypto.randomUUID();
    set((state) => ({
      projects: [
        ...state.projects,
        {
          ...data,
          todos: [],
          id,
          createAt: Date.now(),
          updateAt: Date.now(),
          completed: false,
          pinned: false,
        },
      ],
    }));
    return id;
  },

  delete_project: (target_id) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== target_id),
    }));
  },

  update_project: (target_id, data) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === target_id) {
          return { ...p, ...data, updateAt: Date.now() };
        } else return p;
      }),
    }));
  },

  get_project: (target_id) => {
    return get().projects.find((p) => p.id === target_id);
  },

  todo_updater: (project_id, updateFn) => {
    set((state) => {
      const updated_projects = state.projects.map((p) => {
        if (p.id !== project_id) return p;

        const updated_todos = updateFn(p.todos);

        return {
          ...p,
          todos: updated_todos,
          updateAt: Date.now(),
          completed: updated_todos.every((t) => t.completed),
        };
      });
      return { projects: updated_projects };
    });
  },

  create_todo: (project_id, data) => {
    get().todo_updater(project_id, (prev_todos) => [
      ...prev_todos,
      { ...data, id: crypto.randomUUID(), completed: false, subTodos: [] },
    ]);
  },

  delete_todo: (project_id, target_id) => {
    get().todo_updater(project_id, (prev_todos) =>
      prev_todos.filter((t) => t.id !== target_id)
    );
  },

  update_todo: (project_id, target_id, data) => {
    get().todo_updater(project_id, (prev_todos) =>
      prev_todos.map((t) => (t.id !== target_id ? t : { ...t, ...data }))
    );
  },

  get_todo: (project_id, target_id) => {
    let found_project = get().projects.find((p) => p.id === project_id);
    if (!found_project) return;
    return found_project.todos.find((t) => t.id === target_id);
  },

  subTodos_updater: (project_id, todo_id, updateFn) => {
    set((state) => {
      const updated_projects = state.projects.map((project) => {
        if (project.id !== project_id) return project;

        const updated_todos = project.todos.map((todo) => {
          if (todo.id !== todo_id) return todo;

          const updated_subTodos = updateFn(todo.subTodos);

          return {
            ...todo,
            subTodos: updated_subTodos,
            completed: updated_subTodos.every((st) => st.completed),
          };
        });

        return {
          ...project,
          todos: updated_todos,
          updateAt: Date.now(),
          completed: updated_todos.every((t) => t.completed),
        };
      });

      return { projects: updated_projects };
    });
  },

  create_subTodo: (project_id, todo_id, data) => {
    get().subTodos_updater(project_id, todo_id, (prev_subTodos) => [
      ...prev_subTodos,
      { ...data, id: crypto.randomUUID(), completed: false },
    ]);
  },

  delete_subTodo: (project_id, todo_id, target_id) => {
    get().subTodos_updater(project_id, todo_id, (prev_subTodos) =>
      prev_subTodos.filter((st) => st.id !== target_id)
    );
  },

  update_subTodo: (project_id, todo_id, target_id, data) => {
    get().subTodos_updater(project_id, todo_id, (prev_subTodos) =>
      prev_subTodos.map((st) => (st.id !== target_id ? st : { ...st, ...data }))
    );
  },
}));
