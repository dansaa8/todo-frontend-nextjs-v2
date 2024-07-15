import { useFormStatus } from 'react-dom';

export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      {children && !pending ? (
        <div className="my-2 p-2 bg-red-200 border rounded border-red-400 text-sm">
          {children}
        </div>
      ) : null}
    </>
  );
}
