import { TodoDashboard, TodoList } from "@features/todo";

function Home() {
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
        <TodoDashboard/>
        <TodoList/>
      </main>
    </>
  );
}

export default Home;