import { create } from "zustand";
import type { Project, RemindBefore, SubTodo, Todo } from "../types";
import type { Dayjs } from "dayjs";

interface ProjectStore {
  projects: Project[];

  create_project: (data: {
    title: string;
    deadline: Dayjs | Date | null;
    description: string;
    remind_before: RemindBefore;
  }) => string;
  delete_project: (project_id: string) => void;
  update_project: (project_id: string, data: Partial<Project>) => void;
  get_project: (project_id: string) => Project | undefined;

  todo_updater: (
    project_id: string,
    updateFn: (prev_todos: Todo[]) => Todo[]
  ) => void;
  create_todo: (project_id: string, title: string) => void;
  delete_todo: (project_id: string, todo_id: string) => void;
  update_todo: (
    project_id: string,
    todo_id: string,
    data: Partial<Todo>
  ) => void;
  get_todo: (project_id: string, todo_id: string) => Todo | undefined;

  subTodos_updater: (
    project_id: string,
    todo_id: string,
    updateFn: (prev_subTodos: SubTodo[]) => SubTodo[]
  ) => void;
  create_subTodo: (project_id: string, todo_id: string, title: string) => void;
  delete_subTodo: (
    project_id: string,
    todo_id: string,
    subTodo_id: string
  ) => void;
  update_subTodo: (
    project_id: string,
    todo_id: string,
    subTodo_id: string,
    data: Partial<SubTodo>
  ) => void;
}

export const useProjectStore = create<ProjectStore>()((set, get) => ({
  projects: localStorage.getItem("projects")
    ? JSON.parse(localStorage.getItem("projects") || "")
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

  delete_project: (project_id) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== project_id),
    }));
  },

  update_project: (project_id, data) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === project_id) {
          return { ...p, ...data, updateAt: Date.now() };
        } else return p;
      }),
    }));
  },

  get_project: (project_id) => {
    return get().projects.find((p) => p.id === project_id);
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

  create_todo: (project_id, title) => {
    get().todo_updater(project_id, (prev_todos) => [
      ...prev_todos,
      { title, id: crypto.randomUUID(), completed: false, subTodos: [] },
    ]);
  },

  delete_todo: (project_id, todo_id) => {
    get().todo_updater(project_id, (prev_todos) =>
      prev_todos.filter((t) => t.id !== todo_id)
    );
  },

  update_todo: (project_id, todo_id, data) => {
    get().todo_updater(project_id, (prev_todos) =>
      prev_todos.map((t) => (t.id !== todo_id ? t : { ...t, ...data }))
    );
  },

  get_todo: (project_id, todo_id) => {
    let found_project = get().projects.find((p) => p.id === project_id);
    if (!found_project) return;
    return found_project.todos.find((t) => t.id === todo_id);
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

  create_subTodo: (project_id, todo_id, title) => {
    get().subTodos_updater(project_id, todo_id, (prev_subTodos) => [
      ...prev_subTodos,
      { title, id: crypto.randomUUID(), completed: false },
    ]);
  },

  delete_subTodo: (project_id, todo_id, subTodo_id) => {
    get().subTodos_updater(project_id, todo_id, (prev_subTodos) =>
      prev_subTodos.filter((st) => st.id !== subTodo_id)
    );
  },

  update_subTodo: (project_id, todo_id, subTodo_id, data) => {
    get().subTodos_updater(project_id, todo_id, (prev_subTodos) =>
      prev_subTodos.map((st) =>
        st.id !== subTodo_id ? st : { ...st, ...data }
      )
    );
  },
}));
