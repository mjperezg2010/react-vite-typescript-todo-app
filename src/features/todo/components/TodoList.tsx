// import { useState } from 'react'
import { formatDate } from '@utils/date'
import type { Todo } from '../types'

function TodosBlock({
  title,
  items,
  toggleCompleted,
  emptyText,
}: {
  title: string;
  items: Todo[];
  toggleCompleted: (id: number) => void;
  emptyText: string;
}) {
  return items.length > 0 ? (
    <ul className="list bg-base-100 rounded-box shadow-md max-w-xl mx-auto mt-4">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">{title}</li>
      {items.map((todo) => (
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
          <div className={todo.completed ? 'line-through opacity-60' : ''}>
            <div>{todo.title}</div>
            <div className="text-xs uppercase font-semibold">
              {todo.targetTime} - {formatDate(todo.targetDate)}
            </div>
          </div>
          <p
            className={
              'list-col-wrap text-xs text-gray-500 ' +
              (todo.completed ? 'line-through opacity-60' : '')
            }
          >
            Observation: {todo.observation || 'No observations provided.'}
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <div className="bg-base-100 rounded-box shadow-md mt-4 p-6 text-sm opacity-70">
      {emptyText}
    </div>
  );
}

type Props = {
  todos: Todo[];
  toggleCompleted: (id: number) => void;
}

function TodoList({todos, toggleCompleted}: Props) {
    // Hooks

    // States

    // Variables
    const pendingTodos = todos.filter(t => !t.completed)
    const completedTodos = todos.filter(t => t.completed)

    // Handlers

    return (<>
        {/* name of each tab group should be unique */}
        <div className="tabs tabs-border max-w-xl mx-auto">
            <input type="radio" name="todos_tabs" className="tab" aria-label="Pending Tasks" defaultChecked/>
            <div className="tab-content border-base-300 bg-base-100 p-2">
                <TodosBlock
                  title="Pending tasks"
                  items={pendingTodos}
                  toggleCompleted={toggleCompleted}
                  emptyText="No pending tasks. Enjoy your day!"
                />
            </div>

            <input type="radio" name="todos_tabs" className="tab" aria-label="Completed Tasks"  />
            <div className="tab-content border-base-300 bg-base-100 p-2">
              <TodosBlock
                title="Completed tasks"
                items={completedTodos}
                toggleCompleted={toggleCompleted}
                emptyText="No completed tasks yet."
              />
            </div>

            <input type="radio" name="todos_tabs" className="tab" aria-label="All Tasks" />
            <div className="tab-content border-base-300 bg-base-100 p-2">
              <TodosBlock
                title="All tasks"
                items={todos}
                toggleCompleted={toggleCompleted}
                emptyText="No tasks yet. Create your first one!"
              />
            </div>
        </div>


        {/* <div role="tablist" className="tabs tabs-border max-w-xl mx-auto">
            <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'pending'}
                className={"tab " + (activeTab === 'pending' ? 'tab-active' : '')}
                onClick={() => setActiveTab('pending')}
            >
                Pending Tasks
            </button>
            <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'completed'}
                className={"tab " + (activeTab === 'completed' ? 'tab-active [--tab-border-color:red]' : '')}
                onClick={() => setActiveTab('completed')}
            >
                Completed Tasks
            </button>
            <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'all'}
                className={"tab " + (activeTab === 'all' ? 'tab-active' : '')}
                onClick={() => setActiveTab('all')}
            >
                All Tasks
            </button>
        </div>
        {filteredTodos.length > 0 ? (
            <ul className="list bg-base-100 rounded-box shadow-md max-w-xl mx-auto mt-4">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    {activeTab === 'pending' && 'Pending tasks'}
                    {activeTab === 'completed' && 'Completed tasks'}
                    {activeTab === 'all' && 'All tasks'}
                </li>
                {filteredTodos.map(todo => (
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
                        <div className={todo.completed ? 'line-through opacity-60' : ''}>
                            <div>{todo.title}</div>
                            <div className="text-xs uppercase font-semibold">{ todo.targetTime } - { formatDate(todo.targetDate) }</div>
                        </div>
                        <p className={'list-col-wrap text-xs text-gray-500 ' + (todo.completed ? 'line-through opacity-60' : '')}>
                            Observation: {todo.observation || 'No observations provided.'}
                        </p>
                    </li>
                ))}
            </ul>
        ) : (
            <div className="bg-base-100 rounded-box shadow-md max-w-xl mx-auto mt-4 p-6 text-sm opacity-70">
                {activeTab === 'pending' && 'No pending tasks. Enjoy your day!'}
                {activeTab === 'completed' && 'No completed tasks yet.'}
                {activeTab === 'all' && 'No tasks yet. Create your first one!'}
            </div>
        )} */}
    </>)
}

export {TodoList}