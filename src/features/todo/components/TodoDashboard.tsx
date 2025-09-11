import type { Todo } from "../types";
import { isToday } from "date-fns";

type Props = {
  todos: Todo[];
}

function TodoDashboard({todos}: Props) {
  // Build a Date from string fields targetDate (e.g. "2025-09-25") and targetTime (e.g. "14:30" or "14:30:00")
  const toLocalDateFromTargets = (t: any): Date | null => {
    const dateStr = typeof t?.targetDate === "string" ? t.targetDate.trim() : "";
    const timeStrRaw = typeof t?.targetTime === "string" ? t.targetTime.trim() : "";

    if (!dateStr) return null;

    // Default time to 00:00 if missing
    const timeStr = timeStrRaw || "00:00";
    // Ensure time has seconds (HH:mm:ss)
    const timeWithSeconds = /^\d{2}:\d{2}(:\d{2})?$/.test(timeStr)
      ? (timeStr.length === 5 ? `${timeStr}:00` : timeStr)
      : null;

    if (!timeWithSeconds) return null;

    // Combine into an ISO-like local datetime string
    const isoLike = `${dateStr}T${timeWithSeconds}`; // treated as local by JS Date
    const d = new Date(isoLike);

    if (!isNaN(d.getTime())) return d;

    // Fallback: try parsing date only (handles odd inputs)
    const onlyDate = new Date(dateStr);
    return isNaN(onlyDate.getTime()) ? null : onlyDate;
  };

  const dueToday = todos.reduce((acc, t) => {
    const d = toLocalDateFromTargets(t);
    return d && isToday(d) && !t.completed ? acc + 1 : acc;
  }, 0);
  
  return (
    <div className="flex justify-center">
        <div className="stats shadow-lg rounded-box bg-base-100 w-full max-w-3xl p-4">
          <div className="stat flex-1">
              <div className="stat-title">Tasks</div>
              <div className="stat-value text-3xl md:text-4xl">{ todos.length }</div>
              <div className="stat-desc text-xs md:text-sm">{dueToday} due today</div>
          </div>
          <div className="stat flex-1">
              <div className="stat-title">Pending</div>
              <div className="stat-value text-3xl md:text-4xl">{ todos.filter(t => !t.completed).length }</div>
              <div className="stat-desc text-xs md:text-sm">Waiting for review</div>
          </div>
          <div className="stat flex-1">
              <div className="stat-title">Completed</div>
              <div className="stat-value text-3xl md:text-4xl">{ todos.filter(t => t.completed).length }</div>
          </div>
        </div>
    </div>
  )
}

export {TodoDashboard};