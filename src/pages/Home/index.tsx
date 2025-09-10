import { useEffect, useState, useCallback } from "react";
import { TodoDashboard, TodoList,NewEditTodoModal } from "@features/todo";
import { useTodos } from "@features/todo/useTodos";
import { useToast } from "@hooks/useToast";
import type { Todo } from "@features/todo/types";

function Home() {
  // Hooks
  const {todos,error,loading, toggleCompleted,addTodo,removeTodo,editTodo} = useTodos()
  const { showToast } = useToast()

  // Default values
  const defaultTodo:Todo = {
    id:0,
    title:"",
    targetDate:"",
    targetTime:"",
    completed:false
  }

  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFlag,setEditFlag] = useState(false)
  const [todoToEdit,setTodoToEdit] = useState<Todo>(defaultTodo)

  // Functions
  const openNewTodo = ()=>{
    setEditFlag(false)
    setIsModalOpen(true)
  }

  const selectTodoEdit = useCallback((todo: Todo) => {
    setTodoToEdit(todo);
    setIsModalOpen(true);
    setEditFlag(true)
  }, [setTodoToEdit, setIsModalOpen]);

  // Effects
  useEffect(() => {
    if (error) {
      showToast(error, "error")
    }
  }, [error, showToast])

  return (
    <>
      <div className="navbar border-b">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">TodoApp</a>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-primary" onClick={openNewTodo}>New Task</button>
        </div>
      </div>
      
      <NewEditTodoModal
        isOpen={isModalOpen}
        isLoading={loading}
        isEdit={editFlag}
        todoToEdit={todoToEdit}        
        createTodo={addTodo}
        editTodo={editTodo}
        onClose={() => setIsModalOpen(false)}
      />

      <main className="container mx-auto pt-6">
        <TodoDashboard
          todos={todos}
        />
        <TodoList 
          todos={todos} 
          isLoading={loading}
          toggleCompleted={toggleCompleted}
          removeTodo={removeTodo}
          selectTodoEdit={selectTodoEdit}
          
        />
      </main>
    </>
  );
}

export default Home;