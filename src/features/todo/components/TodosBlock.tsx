import { formatDate } from '@utils/date'
import { memo } from 'react'
import type { Todo } from '../types'

type Props = {
  title: string;
  items: Todo[];
  toggleCompleted: (id: number) => void;
  emptyText: string;
}

function TodosBlockComponent({
  title,
  items,
  toggleCompleted,
  emptyText,
}: Props) {
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

export const TodosBlock = memo(TodosBlockComponent);