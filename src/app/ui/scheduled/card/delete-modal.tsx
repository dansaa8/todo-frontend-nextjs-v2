import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import CancelIcon from '@/app/ui/svg/cancel-icon';
import FormButton from '@/app/ui/common/FormButton';
import { Button } from "@nextui-org/react";
import deleteTodoAction from '@/app/actions/delete-todo';
import { useContext } from 'react';
import { TodoContext } from '@/app/providers';

export default function DeleteModal({ handleModalClose }) {
  const todo = useContext(TodoContext);
  const modalContentRef = useRef();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    const handleClickOutside = (event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
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
    <form action={deleteTodoAction}>
      <div
        // onClick={onClose}
        className="z-10 fixed inset-0 bg-gray-300 opacity-80 flex justify-center items-center"
      >
        <div className="fixed inset-0"></div>
      </div>
      <div
        className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 bg-white h-80 w-96 rounded-xl flex flex-col justify-between"
        ref={modalContentRef}
      >
        <CancelIcon
          className="absolute top-2 right-2  cursor-pointer  hover:bg-gray-200 rounded-xl"
          onClick={handleModalClose}
        />
        <h3 className="font-bold text-stone-700 col-start-2 col-end-4 text-center">
          {todo!.name}
        </h3>

        <p className='text-sm'>
          Are you sure you want to remove this task?
        </p>
        <div className="flex justify-around">
          <input type="hidden" name="id" value={todo.id} />
          <FormButton
            className="rounded-xl bg-red-600 px-4 py-2 text-white z-0 hover:bg-red-700"
            showSpinner={true}
            onClick={console.log('ID IS HERE: ', todo.id)}
          >
            Delete
          </FormButton>
          <Button
            className="rounded-xl bg-gray-200 px-4 py-2 text-gray-800 z-0 hover:bg-gray-300"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>,
    document.querySelector('.modal-container')
  );
}
