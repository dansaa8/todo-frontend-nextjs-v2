'use client';
import { useEffect, useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import { Todo } from '@/app/lib/definitions';
import HamburgerIcon from '@/app/ui/svg/hamburger-icon';
import DeleteIcon from '@/app/ui/svg/delete-icon';
import EditIcon from '@/app/ui/svg/edit-icon';
import ActionModal from '@/app/ui/scheduled/card/ActionModal';
import * as actions from '@/app/actions/index';
import Link from 'next/link';

interface HamburgerMenuProps {
  todo: Todo;
}

export default function HamburgerMenu({ todo }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const divEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handler, true);
    // cleanup function
    // kallas automatiskt på när våran dropdown component
    // håller på att tas bort från skärmen.
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const toggleMenu = () => {
    if (!showDeleteModal) {
      // Ensure menu toggles only if the DeleteModal is not shown
      setIsOpen(!isOpen);
      console.log('Dropdown menu is now', isOpen ? 'closed' : 'open');
    }
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setIsOpen(false); // Ensure menu is closed when modal is closed
  };

  return (
    <div ref={divEl} className="relative col-start-4 justify-self-center">
      <IconButton
        className="col-start-4 justify-self-center"
        onClick={toggleMenu}
      >
        <HamburgerIcon />
      </IconButton>
      {isOpen && !showDeleteModal && (
        <ul className="absolute top-full left-1/2 transform -translate-x-1/2  bg-white border border-gray-400 rounded-xl flex justify-center items-center gap-3">
          <li>
            <IconButton>
              <Link href={`/todo/${todo.id}/edit`}>
                <EditIcon className="w-9 h-9" />
              </Link>
            </IconButton>
          </li>
          <span className="h-8 w-px bg-gray-200"></span>
          <li>
            <IconButton
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              <DeleteIcon className="w-7 h-7 text-red-600" />
            </IconButton>
          </li>
        </ul>
      )}
      {showDeleteModal && (
        <ActionModal
          handleModalClose={handleModalClose}
          todo={todo}
          actionMethod={actions.deleteTodo}
          buttonColor="bg-red-600 hover:bg-red-700"
          buttonText='Delete'
          modalText="Are you sure you want to remove this task?"
          snackbarMessage='was deleted.'
        />
      )}
    </div>
  );
}
