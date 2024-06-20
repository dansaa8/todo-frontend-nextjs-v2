'use client';
import loginAction from '@/app/actions/loginAction';
import FormButton from '@/app/ui/common/FormButton';
export default function LoginForm() {
  return (
    <form
      action={async (formData) => {
        await loginAction(formData);
      }}
      className="container-light-gray self-center p-4"
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
        <FormButton className="rounded p-2 bg-orange-300 mt-7">
          Login
        </FormButton>
      </div>
    </form>
  );
}
