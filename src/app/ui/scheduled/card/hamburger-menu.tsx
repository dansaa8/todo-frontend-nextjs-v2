'use client';
import { useEffect, useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
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
    <div ref={divEl} className="">
    <Dropdown>
      <DropdownTrigger>
        <Button 
        isIconOnly 
          variant="bordered" 
        >
          <HamburgerIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          key="edit"
          startContent={<EditIcon className={""} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
        onClick={() => {
          setShowDeleteModal(true)
        }}
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<DeleteIcon className={""} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
      {showDeleteModal && (
        <ActionModal
          handleModalClose={handleModalClose}
          todo={todo}
          actionMethod={actions.deleteTodo}
          buttonColor="bg-red-600 hover:bg-red-700"
          buttonText="Delete"
          modalText="Are you sure you want to remove this task?"
          snackbarMessage="was deleted."
        />
      )}
    </div>
  );
}
