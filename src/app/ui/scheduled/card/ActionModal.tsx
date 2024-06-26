import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@nextui-org/react';
import { Todo } from '@/app/lib/definitions';
import CancelIcon from '@/app/ui/svg/cancel-icon';
import FormButton from '@/app/ui/common/FormButton';
import { useSnackbar } from '@/app/providers/snackbar-context';

interface ModalProps {
  handleModalClose: () => void;
  todo: Todo;
  actionMethod: (formData: FormData) => Promise<void>;
  buttonColor?: string;
  buttonText?: string;
  modalText?: string;
  snackbarMessage?: string;
}

export default function ActionModal({
  handleModalClose,
  todo,
  actionMethod,
  buttonColor,
  buttonText,
  modalText,
  snackbarMessage,
}: ModalProps) {
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
    await actionMethod(formData);
    showSnackbar(`${todo?.name} ${snackbarMessage}`);
    handleModalClose();
  };

  return ReactDOM.createPortal(
    <form action={handleSubmit}>
      <div className="z-10 fixed inset-0 bg-gray-300 opacity-80 flex justify-center items-center">
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

        <p className="text-sm">{modalText}</p>
        <div className="flex justify-around">
          <input type="hidden" name="id" value={todo.id} />
          <FormButton
            className={`rounded-xl px-4 py-2 z-0 ${buttonColor}`}
            pendingText=""
          >
            {buttonText}
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
    document.querySelector('.modal-container') as HTMLDivElement
  );
}
