import TodoContainer from '@/app/ui/scheduled/todo-container';

export default async function Page() {
  return (
    <main className=''>
        <h2 className='pb-5'>Name of the day</h2>
      <TodoContainer />
    </main>
  );
}
