import { useEffect } from "react";
import { TodoDashboard, TodoList } from "@features/todo";
import { useTodos } from "@features/todo/useTodos";
import { useToast } from "@hooks/useToast";

function Home() {
  // Hooks
  const {todos,error, toggleCompleted} = useTodos()
  const { showToast } = useToast()

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
          <button className="btn btn-primary">New Task</button>
        </div>
      </div>

      <main className="container mx-auto pt-6">
        <TodoDashboard
          todos={todos}
        />
        <TodoList 
          todos={todos} 
          toggleCompleted={toggleCompleted}
        />
      </main>
    </>
  );
}

export default Home;