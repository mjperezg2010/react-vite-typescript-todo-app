// function names convention: edit,remove,add,get
import { useState, useEffect } from "react"
import type { Todo } from "./types"
import { fetchTodos,createTodo,updateTodo,deleteTodo } from "./api"

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadTodos() {
        try {
            const fetchedTodos = await fetchTodos()
            setTodos(fetchedTodos)
        } catch (err) {
            setError("Failed to fetch todos")
        } finally {
            setLoading(false)
        }
        }
        loadTodos()
    }, [])

    const addTodo = async(newTodo: Todo) => {
        setLoading(true)
        try {
            const response = await createTodo(newTodo)
            setTodos((prevTodos) => [...prevTodos, response])
        } catch (error) {
            setError("Failed to add todo")
        } finally {
            setLoading(false)
        }
    }

    const editTodo = async(updatedTodo: Todo) => {
        setLoading(true)
        try {
            const response = await updateTodo(updatedTodo)
            setTodos((prevTodos) => prevTodos.map(t => 
                t.id === response.id ? response : t
            ))
        } catch (error) {
            setError("Failed to update todo")
        } finally {
            setLoading(false)
        }
    }

    const removeTodo = async(toDeleteTodoId: number) => {
        setLoading(true)
        try{
            const response = await deleteTodo(toDeleteTodoId)
            setTodos((prevTodos) => prevTodos.filter(t => t.id !== response))

        }catch (error) {
            setError("Failed to delete todo")
        }
        finally {
            setLoading(false)
        }
    } 

    // Edits the todo optimistically (UI updates before server confirmation)
    const editTodoOptimistic = async (updatedTodo: Todo) => {
        const previous = todos

        setTodos(prevTodos => prevTodos.map(t => (t.id === updatedTodo.id ? updatedTodo : t)))

        try {
            await updateTodo(updatedTodo)
        } catch (error) {
            // Roll back if server call fails
            setTodos(previous)
            setError("Failed to update todo (reverted changes)")
        }
    }

    // Marks todo as completed optimistically
    const toggleCompleted = async (id: number) => {
        const current = todos.find(t => t.id === id)
        if (!current) return
        const updated: Todo = { ...current, completed: !current.completed } as Todo
        await editTodoOptimistic(updated)
    }

       

    return { 
        // state
        todos, loading, error,
        // crud operations
        addTodo,editTodo,removeTodo,
        // optimistic helpers
        editTodoOptimistic,
        // specific helpers
        toggleCompleted
    }
}
