// function names convention: edit,remove,add,get
import { useState, useEffect, useCallback, useRef } from "react"
import type { Todo } from "./types"
import { fetchTodos,createTodo,updateTodo,deleteTodo } from "./api"
import { getTodoId } from "@utils/generateId"

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const todosRef = useRef<Todo[]>([])
    useEffect(() => {
        todosRef.current = todos
    }, [todos])

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

    const addTodo = async(title:string,targetDate:string,targetTime:string,observation:string) => {
        const newTodo:Todo = {
            id:getTodoId(todos),
            title,
            targetDate,
            targetTime,
            completed:false,
            observation

        }
        setLoading(true)
        try {
            const response = await createTodo(newTodo)
            setTodos((prevTodos) => [...prevTodos, response])
            return true
        } catch (error) {
            setError("Failed to add todo")
            return false
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
            return true
        } catch (error) {
            setError("Failed to update todo")
            return false
        } finally {
            setLoading(false)
        }
    }

    const removeTodo = useCallback(async (toDeleteTodoId: number) => {
        setLoading(true)
        try{
            const response = await deleteTodo(toDeleteTodoId)
            setTodos((prevTodos) => prevTodos.filter(t => t.id !== response))
        } catch (error) {
            setError("Failed to delete todo")
        } finally {
            setLoading(false)
        }
    }, [])

    // Edits the todo optimistically (UI updates before server confirmation)
    const editTodoOptimistic = useCallback(async (updatedTodo: Todo) => {
        let previous: Todo[] = []
        setTodos(prev => {
            previous = prev
            return prev.map(t => (t.id === updatedTodo.id ? updatedTodo : t))
        })
        try {
            console.log("Updating todo optimistically", updatedTodo)
            await updateTodo(updatedTodo)
        } catch (error) {
            // Roll back if server call fails
            setTodos(previous)
            setError("Failed to update todo (reverted changes)")
        }
    }, [])

    // Marks todo as completed optimistically with a stable callback
    const toggleCompleted = useCallback(async (id: number) => {
        // Use todosRef because `todos` are not stable in this callback
        const previous = todosRef.current
        const current = previous.find(t => t.id === id)
        if (!current) return
        const updated: Todo = { ...current, completed: !current.completed } as Todo

        // Optimistic UI update
        setTodos(prev => prev.map(t => (t.id === id ? updated : t)))

        try {
            await updateTodo(updated)
        } catch (error) {
            // Roll back if server call fails
            setTodos(previous)
            setError("Failed to update todo (reverted changes)")
        }
    }, [])


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
