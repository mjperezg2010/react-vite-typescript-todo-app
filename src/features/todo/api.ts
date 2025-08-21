import type { Todo } from "./types";

// functions name convention: update, delete, create, fetch
const STORAGE_KEY = "todos";

function getStoredTodos():Todo[] {
  const todos = localStorage.getItem(STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
}

function saveStoredTodos(todos:Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export async function fetchTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStoredTodos());
    }, 700);
  });
}

export async function createTodo(todo: Todo): Promise<Todo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos = getStoredTodos();
      todos.push(todo);
      saveStoredTodos(todos);
      resolve(todo);
    }, 700);
  });
}

export async function updateTodo(updatedTodo: Todo): Promise<Todo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos = getStoredTodos().map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      saveStoredTodos(todos);
      resolve(updatedTodo);
    }, 700);
  });
}

export async function deleteTodo(toDeleteTodoId: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos = getStoredTodos().filter(todo => todo.id !== toDeleteTodoId);
      saveStoredTodos(todos);
      resolve(toDeleteTodoId);
    }, 700);
  });
}

