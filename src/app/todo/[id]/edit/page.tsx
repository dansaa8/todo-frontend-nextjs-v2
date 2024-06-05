interface TodoEditPageProps {
  params: {
    id: string;
  };
}
export default function TodoEditPage(props: TodoEditPageProps) {
  const id = parseInt(props.params.id);

  return <div>Editing todo with id {id}</div>;
}
