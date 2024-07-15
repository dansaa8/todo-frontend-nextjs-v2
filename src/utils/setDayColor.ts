import { Todo } from '@/app/lib/definitions';
export default function setDayColor(relativeDate: String, todos: Todo[]) {
  let dayColor;
  if (relativeDate.includes('Today'))
    dayColor = 'bg-yellow-50 border-yellow-200';
  else if (
    relativeDate.includes('days ago') ||
    relativeDate.includes('Yesterday')
  ) {
    if (todos.length > 0) {
      dayColor = 'bg-red-100 border border-red-200';
    } else {
      dayColor = 'bg-green-200 border border-green-300';
    }
  } else dayColor = 'bg-blue-50 border border-blue-100';
  return dayColor;
}
