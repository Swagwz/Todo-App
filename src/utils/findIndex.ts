export function findIndex(todos, target_id) {
  let index = -1;

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id === target_id) {
      index = i;
    }
  }

  return index;
}
