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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const divEl = useRef<HTMLDivElement>(null);

  return (
    <div ref={divEl} className="">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="bordered">
            <HamburgerIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons" disabledKeys={["edit"]}>
          <DropdownItem key="edit" startContent={<EditIcon className={''} />}>
            Edit Todo
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
    </div>
  );
}
