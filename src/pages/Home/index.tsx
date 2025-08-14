
function Home() {
  return (
    <>
      <div className="navbar bg-base-100 border-b">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">TodoApp</a>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-primary">New Task</button>
        </div>
      </div>

      <main className="container mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Welcome</h2>
              <p>Manage your tasks efficiently and stay organized!</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Tasks</div>
              <div className="stat-value">12</div>
              <div className="stat-desc">3 due today</div>
            </div>
            <div className="stat">
              <div className="stat-title">Completed</div>
              <div className="stat-value">8</div>
              <div className="stat-desc">+2 this week</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;