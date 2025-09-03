import { formatDate } from '@utils/date'
import { memo, useState } from 'react'
import type { Todo } from '../types'

import { parse, isBefore, isValid, set } from 'date-fns'

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

  // States
  const [fadingId, setFadingId] = useState<number | null>(null);

  // Helper
  const isOverdue = (t: Todo) => {
    if (!t.targetDate) return false;

    // Parse date part (expecting string yyy-MM-dd)
    const baseDate = parse(t.targetDate, 'yyyy-MM-dd', new Date())
    
    if (!isValid(baseDate)) return false;

    // Parse time part (expecting 'HH:mm'); default to 00:00 if missing/invalid
    let hours = 0;
    let minutes = 0;
    if (t.targetTime && t.targetTime.length > 0) {
      const [hStr, mStr] = t.targetTime.split(':');
      const h = parseInt(hStr ?? '0', 10);
      const m = parseInt(mStr ?? '0', 10);
      if (!Number.isNaN(h) && !Number.isNaN(m)) {
        hours = h; minutes = m;
      }
    }

    const due = set(baseDate, { hours, minutes, seconds: 0, milliseconds: 0 });
    return isBefore(due, new Date());
  };

  return items.length > 0 ? (
    <ul className="list bg-base-100 rounded-box shadow-md max-w-xl mx-auto mt-4">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">{title}</li>
      {items.map((todo) => (
        <li className="list-row" key={todo.id}>
          <div className="flex items-center">
            <input
              id={`todo-${title.replace(/\s+/g, '-').toLowerCase()}-${todo.id}`}
              name={`todo-${title.replace(/\s+/g, '-').toLowerCase()}-${todo.id}`}
              type="checkbox"
              aria-label="Mark todo as completed"
              className="checkbox checkbox-sm checkbox-primary rounded-full"
              checked={todo.completed}
              onChange={() => {
                if (!todo.completed) {
                  setFadingId(todo.id);
                  setTimeout(() => {
                    toggleCompleted(todo.id);
                    setFadingId(null);
                  }, 300);
                } else {
                  toggleCompleted(todo.id);
                }
              }}
            />
          </div>
          <div className={fadingId === todo.id ? 'line-through opacity-60' : ''}>
            <div>{todo.title}</div>
            <div
              className={
                "text-xs uppercase font-semibold " +
                (!todo.completed && isOverdue(todo) ? "text-error" : "")
              }
            >
              {todo.targetTime} - {formatDate(todo.targetDate)}
              {!todo.completed && isOverdue(todo) && (
                <span className="ml-2 badge badge-error badge-xs">Overdue</span>
              )}
            </div>
          </div>
          <p
            className={
              'list-col-wrap text-xs text-gray-500 ' +
              (fadingId === todo.id ? 'line-through opacity-60' : '')
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