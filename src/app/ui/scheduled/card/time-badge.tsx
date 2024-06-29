import React from 'react';
import ClockIcon from '@/app/ui/svg/clock-icon';

type TimeBadgeProps = {
  color: 'yellow' | 'green';
  dateTimeValue: Date;
  includeDate: boolean;
  children: React.ReactNode
};

export default function TimeBadge({
  color,
  dateTimeValue,
  includeDate,
  children
}: TimeBadgeProps) {
  let border =
    'flex items-center justify-center justify-self-center p-2 h-6 gap-1 text-xs font-medium rounded-full border';
  let textColor;

  if (color === 'yellow') {
    border += ' border-yellow-600 text-yellow-600';
    textColor = 'text-yellow-600';
  }

  if (color === 'green') {
    border += ' border-green-500 text-green-500';
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
      {children}
      <ClockIcon className={`w-5 h-5 ${textColor}`} />
      <span className={textColor}>{timeString}</span>
    </div>
  );
}
