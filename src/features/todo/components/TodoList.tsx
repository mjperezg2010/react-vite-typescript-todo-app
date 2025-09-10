import { useMemo } from 'react'
import type { Todo } from '../types'
import { TodosBlock } from './TodosBlock'
import styles from './TodoList.module.css'

type Props = {
  todos: Todo[];
  isLoading:boolean;
  toggleCompleted: (id: number) => void;
  removeTodo: (id: number) => void;
  selectTodoEdit:(todo:Todo) => void;
}

function TodoList({todos,isLoading, toggleCompleted,removeTodo,selectTodoEdit}: Props) {
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
              emptyText="No pending tasks. Enjoy your day!"
              isLoading={isLoading}
              toggleCompleted={toggleCompleted}
              removeTodo={removeTodo}
              selectTodoEdit={selectTodoEdit}              
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
              emptyText="No completed tasks yet."
              isLoading={isLoading}              
              toggleCompleted={toggleCompleted}
              removeTodo={removeTodo}
              selectTodoEdit={selectTodoEdit}
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
              emptyText="No tasks yet. Create your first one!"
              isLoading={isLoading}              
              toggleCompleted={toggleCompleted}
              removeTodo={removeTodo}
              selectTodoEdit={selectTodoEdit}
            />
          </div>
      </div>
    </>)
}

export {TodoList}