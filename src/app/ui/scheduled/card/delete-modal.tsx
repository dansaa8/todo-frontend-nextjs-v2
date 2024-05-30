import { useEffect } from "react";
import ReactDOM from "react-dom";
import CancelIcon from "@/app/ui/svg/cancel-icon";
import FormButton from "@/app/ui/common/FormButton";
import deleteTodoAction from "@/app/actions/delete-todo";
import { useContext } from 'react';
import { TodoContext } from '@/app/providers';

export default function DeleteModal({handleCancelBtnClick }) {
    const todo = useContext(TodoContext);
    console.log("TODO ID TO BE DELETED IS: ", todo.id);
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden"); // cleanup func. Will be called when Modalcomponent is removed.
    };
  }, []);

  return ReactDOM.createPortal(
    <form action={deleteTodoAction}>
      <div
        // onClick={onClose}
        className="z-10 fixed inset-0 bg-gray-300 opacity-80 flex justify-center items-center"
      >
        <div className="fixed inset-0"></div>
      </div>
      <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 bg-white h-80 w-96 rounded-xl">
        <CancelIcon
          className="absolute top-2 right-2  cursor-pointer  hover:bg-gray-200 rounded-xl"
          onClick={() => {
            handleCancelBtnClick();
          }}
        />
        <div className="flex flex-col justify-between h-full items-center">
          <input type="hidden" name="id" value={todo.id} />
          <FormButton
            className="rounded-xl bg-red-600 px-4 py-2 text-white z-0 hover:bg-red-700"
            showSpinner={true}
            onClick={console.log("ID IS HERE: ", todo.id)}
          >
            Delete
          </FormButton>
        </div>
      </div>
    </form>,
    document.querySelector(".modal-container")
  );
}
