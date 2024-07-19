import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@nextui-org/react';
import CancelIcon from '@/components/svg/cancel-icon';
import FormButton from '@/components/common/FormButton';
import { useSnackbar } from '@/providers/snackbar-context';
import logoutAction from '@/actions/logoutAction';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  handleModalClose: (isLoggedOut?: boolean) => void;
}

export default function LogoutModal({ handleModalClose }: ModalProps) {
  const { showSnackbar } = useSnackbar();

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

  const handleSubmit = async (formData: FormData) => {
    await logoutAction();
    showSnackbar(`Logged out`);
    handleModalClose(true); // Indicates that the user has logged out
  };

  const handleCancelClick = () => {
    handleModalClose(false); // Indicates that the user has cancelled
  };


  return ReactDOM.createPortal(
    <form action={handleSubmit}>
      <div className="z-10 fixed inset-0 bg-gray-300 opacity-80 flex justify-center items-center">
        <div className="fixed inset-0"></div>
      </div>
      <div
        className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 bg-white h-80 w-96 rounded-xl flex flex-col justify-between items-center"
        ref={modalContentRef}
      >
        <CancelIcon
          className="absolute top-2 right-2  cursor-pointer  hover:bg-gray-200 rounded-xl"
          onClick={handleCancelClick}
        />
        <h3 className="font-bold text-stone-700 col-start-2 col-end-4 text-center">
          Are you sure you want to logout?
        </h3>

        <ArrowRightEndOnRectangleIcon className='w-20'/>
        <div className="flex justify-around gap-10">
          <Button
            className="rounded-xl bg-gray-200 px-4 py-2 text-gray-800 z-0 hover:bg-gray-300"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          <FormButton
            className={`rounded-xl px-4 py-2 z-0 bg-amber-300`}
            pendingText=""
          >
            Logout
          </FormButton>
        </div>
      </div>
    </form>,
    document.querySelector('.modal-container') as HTMLDivElement
  );
}
