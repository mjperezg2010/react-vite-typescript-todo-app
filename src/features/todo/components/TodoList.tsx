import { useEffect } from 'react'
import { formatDate } from '@utils/date'
import { useToast } from '@hooks/useToast'
import { useTodos } from '../useTodos'
// import type { Todo } from '../types'

function TodoList() {
    // Hooks
    // const {todos, loading, error, editTodo} = useTodos()
    const {todos,error, toggleCompleted} = useTodos()
    const { showToast } = useToast()
    // States

    // Handlers

    // Effects
    useEffect(() => {
        if (error) {
            showToast(error, "error")
        }
    }, [error, showToast])
    

    return (<>
        <ul className="list bg-base-100 rounded-box shadow-md max-w-xl mx-auto mt-4">  
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Pending tasks</li>
            {todos.map(todo => (
                <li className="list-row" key={todo.id}>
                    <div className="flex items-center">
                    <input
                        type="checkbox"
                        aria-label="Mark todo as completed"
                        className="checkbox checkbox-sm checkbox-primary rounded-full"
                        checked={todo.completed}
                        onChange={() => toggleCompleted(todo.id)}
                    />
                    </div>
                    <div className={todo.completed ? "line-through opacity-60" : ""}>
                        <div>{todo.title}</div>
                        <div className="text-xs uppercase font-semibold">{ todo.targetTime } - { formatDate(todo.targetDate) }</div>
                    </div>
                    <p className={"list-col-wrap text-xs text-gray-500 " + (todo.completed ? "line-through opacity-60" : "") }>
                        Observation: {todo.observation || "No observations provided."}
                    </p>
                </li> 
            ))}    
        </ul>
    </>)
}

export {TodoList}