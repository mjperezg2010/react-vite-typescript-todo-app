import type { Todo } from "../types";

type Props = {
  todos: Todo[];
}

function TodoDashboard({todos}: Props) {
  return (
    <div className="flex justify-center">
        <div className="stats shadow-lg rounded-box bg-base-100 w-full max-w-3xl p-4">
          <div className="stat flex-1">
              <div className="stat-title">Tasks</div>
              <div className="stat-value text-3xl md:text-4xl">{ todos.length }</div>
              <div className="stat-desc text-xs md:text-sm">3 due today</div>
          </div>
          <div className="stat flex-1">
              <div className="stat-title">Pending</div>
              <div className="stat-value text-3xl md:text-4xl">{ todos.filter(t => !t.completed).length }</div>
              <div className="stat-desc text-xs md:text-sm">Waiting for review</div>
          </div>
          <div className="stat flex-1">
              <div className="stat-title">Completed</div>
              <div className="stat-value text-3xl md:text-4xl">{ todos.filter(t => t.completed).length }</div>
              <div className="stat-desc text-xs md:text-sm">+2 this week</div>
          </div>
        </div>
    </div>
  )
}

export {TodoDashboard};