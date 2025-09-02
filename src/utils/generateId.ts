import type { Todo } from "@features/todo/types";

export function getTodoId(fetchedTodos:Todo[]) {
    if (!fetchedTodos || fetchedTodos.length === 0) {
        return 1;
    }

    const maxId = Math.max(...fetchedTodos.map(todo => todo.id));
    return maxId + 1;
}