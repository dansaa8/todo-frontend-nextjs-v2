'use client';
import { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { Todo } from '@/lib/definitions';
import HamburgerIcon from '@/components/svg/hamburger-icon';
import DeleteIcon from '@/components/svg/delete-icon';
import EditIcon from '@/components/svg/edit-icon';
import ActionModal from '@/components/scheduled/card/ActionModal';
import * as actions from '@/actions/todo/index';
import Link from 'next/link';

interface HamburgerMenuProps {
  todo: Todo;
  [key: string]: any;
}

export default function HamburgerMenu({ todo, ...rest }: HamburgerMenuProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Dropdown >
        <DropdownTrigger>
          <Button isIconOnly {...rest}>
            <HamburgerIcon className='h-full w-full'/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with icons"
          // disabledKeys={['edit']}
        >
          <DropdownItem key="edit" startContent={<EditIcon className={''} />}>
            <Link href={`${todo.id}/edit`}>
              Edit Todo
            </Link>
          </DropdownItem>
          <DropdownItem
            onPress={() => {
              setShowDeleteModal(true);
            }}
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<DeleteIcon className={''} />}
          >
            Delete Todo
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {showDeleteModal && (
        <ActionModal
          handleModalClose={() => setShowDeleteModal(false)}
          todo={todo}
          actionMethod={actions.deleteTodo}
          buttonColor="bg-red-600 hover:bg-red-700 text-white"
          buttonText="Delete"
          modalText="Are you sure you want to remove this task?"
          snackbarMessage="was deleted."
        />
      )}
    </>
  );
}
