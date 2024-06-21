'use client';
import { useFormState } from 'react-dom';
import loginAction from '@/app/actions/loginAction';
import FormButton from '@/app/ui/common/FormButton';
export default function LoginForm() {
  const [formState, action] = useFormState(loginAction, { message: '' });
  return (
    <form
      action={async (formData) => {
        await action(formData);
      }}
      className="container-light-gray self-center p-4 m-4"
    >
      <h3 className="font-bold m-1 pb-5 text-center text-xl border border-b-stone-300">
        Login
      </h3>
      <div className="flex flex-col gap-5 mt-4">
        <div>
          <label className="w-12" htmlFor="username">
            Username
          </label>
          <input
            name="username"
            id="username"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="w-12" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            id="password"
            className="border rounded p-2 w-full"
          />
        </div>
        {formState.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400 text-sm">
            {formState.message}
          </div>
        ) : null}
        <FormButton
          className="rounded p-2 bg-orange-300 mt-7"
          pendingText="Logging in..."
        >
          Login
        </FormButton>
      </div>
    </form>
  );
}
