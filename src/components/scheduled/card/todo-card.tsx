'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@nextui-org/react';

import { Todo } from '@/lib/definitions';
import TimeBadge from '@/components/scheduled/card/time-badge';
import HamburgerMenu from '@/components/scheduled/card/hamburger-menu';
import CheckMarkIcon from '@/components/svg/checkmark-icon';
import * as actions from '@/actions/index';
import UndoIcon from '@/components/svg/undo-icon';
import ActionModal from '@/components/scheduled/card/ActionModal';
import FormButton from '@/components/common/FormButton';

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const todoColor = todo.completedAt ? 'bg-green-50' : 'bg-sky-50';
  const [showUndoModal, setShowUndoModal] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    // scrollHeight: The total height of the element's content, including the overflow.
    // clientHeight: The visible height of the element.
    setIsOverflowing(textElement.scrollHeight > textElement.clientHeight);
  }, [todo.description]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`w-full max-w-[500px] border-stone-300 rounded-lg shadow-lg pb-2 bg-white`}
    >
      <section className="flex justify-between p-1 mb-2 px-2 gap-2 border-b border-stone-200 bg-white">
        <h3 className="font-bold italic text-stone-700 text-sm flex justify-center items-center">
          {todo!.name}
        </h3>
        {todo.completedAt ? (
          <TimeBadge
            color="green"
            dateTimeValue={new Date(todo!.completedAt)}
            includeDate={true}
          >
            Completed at:{' '}
          </TimeBadge>
        ) : (
          <TimeBadge
            color="yellow"
            dateTimeValue={new Date(todo!.deadline)}
            includeDate={false}
          >
            Deadline:{' '}
          </TimeBadge>
        )}
      </section>

      <section className="flex justify-between px-5">
        <div>
          <div
            className={`w-52 rounded border border-stone-300 bg-white mr-5 flex-grow ${
              isExpanded ? 'h-auto' : 'h-20'
            }`}
          >
            <div
              ref={textRef}
              className={`p-1 overflow-hidden break-words w-full ${
                isExpanded ? '' : 'line-clamp-3'
              }`}
            >
              {todo.description}
            </div>
          </div>
          {isOverflowing && (
            <button className="text-blue-500 mt-2" onClick={toggleExpand}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        <div className='flex h-full w-full items-center justify-center pt-1'>
          <div className="flex flex-wrap-reverse justify-around items-end gap-2 w-full max-h-24">
            <HamburgerMenu
              todo={todo}
              className="flex-grow flex-shrink max-w-12 max-h-14 min-w-10 min-h-10"
              style={{ height: 'auto' }}
            />
            {!todo.completedAt ? (
              <FormButton
                className="flex-grow flex-shrink max-w-12 max-h-14 min-w-10 min-h-10"
                isIconOnly
                pendingText=""
                style={{ height: 'auto' }}
                onClick={() => {
                  actions.completeTodo(todo.id);
                }}
              >
                <CheckMarkIcon className="h-full w-full" />
              </FormButton>
            ) : (
              <Button
                className="flex-grow flex-shrink max-w-16 max-h-16 min-w-10 min-h-10"
                isIconOnly
                style={{ height: 'auto' }}
                onClick={() => {
                  setShowUndoModal(true);
                }}
              >
                <UndoIcon />
              </Button>
            )}
          </div>
        </div>
      </section>

      {showUndoModal && (
        <ActionModal
          handleModalClose={() => {
            setShowUndoModal(false);
          }}
          todo={todo}
          actionMethod={actions.undoTodo}
          buttonColor={'bg-amber-500 hover:bg-amber-600 text-white'}
          buttonText="Undo"
          modalText="Are you sure you want to undo this task?"
          snackbarMessage="is set to undone."
        />
      )}
    </div>
  );
}
