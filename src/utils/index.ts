export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getRelativeDateLabel(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0); // Reset time to start of day

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); // Calculate difference in days

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays === -1) {
    return 'Yesterday';
  } else if (diffDays > 1 && diffDays) {
    return `In ${diffDays} days`;
  } else if (diffDays < -1 && diffDays) {
    return `${Math.abs(diffDays)} days ago`;
  } else {
    return formatDate(targetDate);
  }
}

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}

export function formatDateWithSuffix(date: Date): [string, string, string] {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"
  ];
  
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();


  return [dayOfWeek, `${day} ${month}`, year.toString()];
}
