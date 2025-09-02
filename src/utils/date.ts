import { format, parseISO, isValid, addHours } from 'date-fns';

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

export function formatDateTimeInput(
  date: string | Date,
  dateTimeFormat = "yyyy-MM-dd'T'HH:mm"
): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) {
    throw new Error('Invalid date provided to formatDateTimeLocal');
  }
  return format(parsedDate, dateTimeFormat);
}

export function nextHourDateTimeInput(baseDate?: Date): string {
  const oneHourAhead = addHours(baseDate ?? new Date(), 1);
  return formatDateTimeInput(oneHourAhead);
}
