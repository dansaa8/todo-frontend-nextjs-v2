'use client';
import { useEffect, useState, useRef, use } from 'react';
import { IconButton } from '@mui/material';
import HamburgerIcon from '@/app/ui/svg/hamburger-icon';
import DeleteIcon from '@/app/ui/svg/delete-icon';
import EditIcon from '@/app/ui/svg/edit-icon';
import DeleteModal from './delete-modal';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
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
    setIsOpen(!isOpen);
    console.log('Dropdown menu is now', isOpen ? 'closed' : 'open');
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
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
              <EditIcon className="w-9 h-9" />
            </IconButton>
          </li>
          <span className="h-8 w-px bg-gray-200"></span>
          <li>
            <IconButton onClick={() => {setShowDeleteModal(true)}}>
              <DeleteIcon className="w-7 h-7 text-red-600" />
            </IconButton>
          </li>
        </ul>
      )}
      {showDeleteModal && (
        <DeleteModal handleModalClose={handleModalClose} />
      )}
    </div>
  );
}
