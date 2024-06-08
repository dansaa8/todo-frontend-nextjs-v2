// "use client";
// import { notFound } from 'next/navigation';
// import { useTodoListContext } from '@/app/providers/todo-list-context';

// interface TodoEditPageProps {
//   params: {
//     id: string;
//   };
// }
// export default async function TodoEditPage(props: TodoEditPageProps) {
//   const id = parseInt(props.params.id);
//   const {todos, setTodos} = useTodoListContext();
//   const todo = todos.find((todo) => todo.id = id);

// //   if (!todo) {
// //     return notFound();
// //   }

//   return <div>Editing todo with id {id}</div>;
// }
