'use client';
import { useState } from 'react';
import { Button } from '@nextui-org/react';

import { Todo } from '@/lib/definitions';
import TimeBadge from '@/components/scheduled/card/time-badge';
import HamburgerMenu from '@/components/scheduled/card/hamburger-menu';
import CheckMarkIcon from '@/components/svg/checkmark-icon';
import * as actions from '@/actions/index';
import UndoIcon from '../../svg/undo-icon';
import ActionModal from '@/components/scheduled/card/ActionModal';
import FormButton from '../../common/FormButton';

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const todoColor = todo.completedAt ? 'bg-green-50' : 'bg-sky-50';
  const [showUndoModal, setShowUndoModal] = useState(false);

  return (
    <div
      className={`w-full border border-stone-300 rounded-lg shadow-lg pb-2 bg-white`}
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
        <div className="w-40 rounded border border-stone-300 bg-white flex-grow mr-5">
          <p className="p-1">{todo.description}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <HamburgerMenu todo={todo} />
          {!todo.completedAt ? (
            <FormButton
              isIconOnly
              pendingText=""
              onClick={() => {
                actions.completeTodo(todo.id);
              }}
            >
              <CheckMarkIcon />
            </FormButton>
          ) : (
            <Button
              isIconOnly
              onClick={() => {
                setShowUndoModal(true);
              }}
            >
              <UndoIcon />
            </Button>
          )}
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
