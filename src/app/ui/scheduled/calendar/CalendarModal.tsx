import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@nextui-org/react';
import { Todo } from '@/app/lib/definitions';
import CancelIcon from '@/app/ui/svg/cancel-icon';
import CalendarWithTodos from '@/app/ui/scheduled/calendar/CalendarWithTodos';

interface CalendarModalProps {
  handleModalClose: () => void;
  handleDateChange: (date: Date) => void;
  todos: Todo[];
  selectedDate: Date;
}

export default function CalendarModal({
  handleModalClose,
  handleDateChange,
  todos,
  selectedDate
}: CalendarModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        handleModalClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // cleanup func. Will be called when Modalcomponent is removed.
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleModalClose]);

  return ReactDOM.createPortal(
    <div>
      <div className="z-10 fixed inset-0 bg-gray-300 opacity-80 flex justify-center items-center">
        <div className="fixed inset-0"></div>
      </div>
      <div
        className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 bg-white gap-5  w-96 rounded-xl flex flex-col justify-between"
        ref={modalContentRef}
      >
        <CancelIcon
          className="absolute top-2 right-2  cursor-pointer  hover:bg-gray-200 rounded-xl"
          onClick={handleModalClose}
        />
        <h3 className="font-bold text-stone-700 col-start-2 col-end-4 text-center">
          Select a Date
        </h3>
        <CalendarWithTodos todos={todos} handleDateChange={handleDateChange} selectedDate={selectedDate}/>
        <div className="flex justify-around">
          <Button
            className="rounded-xl bg-gray-200 px-4 py-2 text-gray-800 z-0 hover:bg-gray-300"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container') as HTMLDivElement
  );
}
