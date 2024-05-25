import React from 'react';
import ClockIcon from '@/app/ui/svg/clock-icon';

type TimeBadgeProps = {
  color: 'amber' | 'green';
  dateTimeValue: Date;
  includeDate: boolean;
};

export default function TimeBadge({
  color,
  dateTimeValue,
  includeDate,
}: TimeBadgeProps) {
  let border =
    'flex inline-flex items-center gap-1 py-1 px-3 text-xs font-medium rounded-full border ';
  let textColor;

  if (color === 'amber') {
    border += 'border-amber-500 text-amber-500';
    textColor = 'text-amber-500';
  }

  if (color === 'green') {
    border += 'border-green-500 text-green-500';
    textColor = 'text-green-500';
  }

  const timeString = includeDate
    ? `${dateTimeValue.toLocaleDateString()} ${dateTimeValue.toLocaleTimeString(
        [],
        { hour: '2-digit', minute: '2-digit' }
      )}`
    : dateTimeValue.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

  return (
    <div className={border}>
      <ClockIcon className={`w-4 h-4 ${textColor}`} />
      <span className={textColor}>{timeString}</span>
    </div>
  );
}
