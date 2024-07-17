import LoginForm from '@/components/form/loginForm';

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-r from-orange-300 to-purple-400 h-screen flex flex-col justify-center items-center relative">
      <h1 className="absolute top-0 left-0 p-4 font-bold text-white text-xl">Todo-manager</h1>
      <LoginForm />
    </div>
  );
}
