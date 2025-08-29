import { format, parseISO, isValid } from 'date-fns';

export function formatDate(date: string | Date, dateFormat = 'MM/dd/yyyy'): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) {
    throw new Error('Invalid date provided to formatDate');
  }
  return format(parsedDate, dateFormat);
}

export function formatTime(date: string | Date, timeFormat = 'HH:mm:ss'): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) {
    throw new Error('Invalid date provided to formatTime');
  }
  return format(parsedDate, timeFormat);
}
