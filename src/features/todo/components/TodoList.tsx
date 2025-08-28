import { useMemo } from 'react'
import type { Todo } from '../types'
import { TodosBlock } from './TodosBlock'
import styles from './TodoList.module.css'

type Props = {
  todos: Todo[];
  toggleCompleted: (id: number) => void;
}

function TodoList({todos, toggleCompleted}: Props) {
    // Hooks

    // States

    // Variables
    const pendingTodos = useMemo(() => todos.filter(t => !t.completed), [todos])
    const completedTodos = useMemo(() => todos.filter(t => t.completed), [todos])

    // Handlers

    return (<>
      {/* name of each tab group should be unique */}
      <div className={`tabs tabs-border max-w-xl mx-auto ${styles.tabsRed}`}>
        <input type="radio" role="tab"
          name="todos_tabs" className="tab"
          aria-label="Pending Tasks" defaultChecked
        />
          <div className="tab-content border-base-300 bg-base-100 p-2">
            <TodosBlock
              title="Pending tasks"
              items={pendingTodos}
              toggleCompleted={toggleCompleted}
              emptyText="No pending tasks. Enjoy your day!"
            />
          </div>

          <input
            type="radio"
            role="tab"
            name="todos_tabs"
            className="tab"
            aria-label="Completed Tasks"
          />
          <div className="tab-content border-base-300 bg-base-100 p-2">
            <TodosBlock
              title="Completed tasks"
              items={completedTodos}
              toggleCompleted={toggleCompleted}
              emptyText="No completed tasks yet."
            />
          </div>

          <input
            type="radio"
            role="tab"
            name="todos_tabs"
            className="tab"
            aria-label="All Tasks"
          />
          <div className="tab-content border-base-300 bg-base-100 p-2">
            <TodosBlock
              title="All tasks"
              items={todos}
              toggleCompleted={toggleCompleted}
              emptyText="No tasks yet. Create your first one!"
            />
          </div>
      </div>
    </>)
}

export {TodoList}