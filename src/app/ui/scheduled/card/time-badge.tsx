import React from 'react';
import ClockIcon from '@/app/ui/svg/clock-icon';

type TimeBadgeProps = {
  color: 'yellow' | 'green';
  dateTimeValue: Date;
  includeDate: boolean;
  children: React.ReactNode;
};

export default function TimeBadge({
  color,
  dateTimeValue,
  includeDate,
  children,
}: TimeBadgeProps) {
  let borderColor;
  let textColor;

  if (color === 'yellow') {
    borderColor = ' border-yellow-600 text-yellow-600';
    textColor = 'text-yellow-600';
  }

  if (color === 'green') {
    borderColor = ' border-green-500 text-green-500';
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

  const date = includeDate ? dateTimeValue.toLocaleDateString() : null;
  const time = dateTimeValue.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`${borderColor} px-3 gap-1 text-xs font-medium rounded-full border flex flex-col items-center`}
    >
      <div className="flex flex-wrap items-center justify-center">
        <p className="mr-0.5">{children}</p>
        <div className='flex flex-wrap items-center justify-center gap-0.5'>
          <ClockIcon className={`w-5 h-5 ${textColor}`} />
          <span className={textColor}>{time}</span>
        </div>
      </div>
      {includeDate && (
        <>
          <div className="w-full border-t border-green-200"> </div>
          <span className={`${textColor}`}>{date}</span>
        </>
      )}
    </div>
  );
}
