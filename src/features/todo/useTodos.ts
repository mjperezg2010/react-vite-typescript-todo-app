// function names convention: edit,remove,add,get
import { useState, useEffect } from "react";
import type { Todo } from "./types";
import { fetchTodos,createTodo,updateTodo,deleteTodo } from "./api";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTodos() {
        try {
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
        } catch (err) {
            setError("Failed to fetch todos");
        } finally {
            setLoading(false);
        }
        }
        loadTodos();
    }, []);

    const addTodo = async(newTodo: Todo) => {
        setLoading(true);
        try {
            const response = await createTodo(newTodo);
            setTodos((prevTodos) => [...prevTodos, response]);
        } catch (error) {
            setError("Failed to add todo");
        } finally {
            setLoading(false);
        }
    }

    const editTodo = async(updatedTodo: Todo) => {
        setLoading(true);
        try {
            const response = await updateTodo(updatedTodo);
            setTodos((prevTodos) => prevTodos.map(todo => 
                todo.id === response.id ? response : todo
            ));
        } catch (error) {
            setError("Failed to update todo");
        } finally {
            setLoading(false);
        }
    }

    const removeTodo = async(toDeleteTodoId: number) => {
        setLoading(true)
        try{
            const response = await deleteTodo(toDeleteTodoId);
            setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== response));

        }catch (error) {
            setError("Failed to delete todo");
        }
        finally {
            setLoading(false);
        }
    }

    return { 
        todos, loading, error,
        addTodo,editTodo,removeTodo
    };
}
