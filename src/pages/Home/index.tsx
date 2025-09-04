import { useEffect, useState } from "react";
import { TodoDashboard, TodoList,NewTodoModal } from "@features/todo";
import { useTodos } from "@features/todo/useTodos";
import { useToast } from "@hooks/useToast";

function Home() {
  // Hooks
  const {todos,error,loading, toggleCompleted,addTodo,removeTodo} = useTodos()
  const { showToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleCreateTodo = (todo: { title: string; description?: string; dueDate?: string }) => {
  //   showToast(`Created todo: ${todo.title}`, "success");
  // }

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
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>New Task</button>
        </div>
      </div>
      
      <NewTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        createTodo={addTodo}
        isLoading={loading}
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
          
        />
      </main>
    </>
  );
}

export default Home;