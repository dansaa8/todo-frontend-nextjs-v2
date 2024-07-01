'use client';
import { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Todo } from '@/app/lib/definitions';
import TimeBadge from '@/app/ui/scheduled/card/time-badge';
import HamburgerMenu from '@/app/ui/scheduled/card/hamburger-menu';
import CheckMarkIcon from '@/app/ui/svg/checkmark-icon';
import * as actions from '@/app/actions/index';
import UndoIcon from '../../svg/undo-icon';
import ActionModal from './ActionModal';

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const todoColor = todo.completedAt ? 'bg-green-50' : 'bg-sky-50';
  const [showUndoModal, setShowUndoModal] = useState(false);

  return (
    <div
      className={`w-full border border-stone-300 rounded-lg bg-stone-50 shadow-lg pb-2 ${todoColor}`}
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

      <section className="flex justify-around">
        <HamburgerMenu todo={todo} />
        <div className=" w-40 rounded border border-stone-300 bg-white">
          <p className="p-1">{todo.description}</p>
        </div>
        {!todo.completedAt ? (
          <Button
            variant="contained"
            color="inherit"
            className="flex justify-center bg-grey-200 hover:bg-lime-300 mr-0.5"
            onClick={() => {
              actions.completeTodo(todo.id);
            }}
          >
            <CheckMarkIcon />
            {/* Done */}
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="inherit"
            className="bg-grey-200 hover:bg-amber-400 mr-0.5"
            sx={{ borderRadius: '50%' }}
            onClick={() => {
              setShowUndoModal(true);
            }}
          >
            <UndoIcon />
          </Button>
        )}
      </section>
      {showUndoModal && (
        <ActionModal
          handleModalClose={() => {
            setShowUndoModal(false);
          }}
          todo={todo}
          actionMethod={actions.undoTodo}
          buttonColor={'bg-amber-500 text-white hover:bg-amber-600'}
          buttonText="Undo"
          modalText="Are you sure you want to undo this task?"
          snackbarMessage="is set to undone."
        />
      )}
    </div>
  );
}
