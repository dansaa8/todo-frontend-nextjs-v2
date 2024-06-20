import LoginForm from '@/app/ui/form/loginForm';

export default function LoginPage() {
  return (
    <div className="primary-background h-screen flex flex-col justify-center items-center relative">
      <h1 className="absolute top-0 left-0 p-4 font-bold">Todo-manager</h1>
      <LoginForm />
    </div>
  );
}
