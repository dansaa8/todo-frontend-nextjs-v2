interface TodoShowPageProps {
    params: {
        id: string
    }
}

export default function TodoEditPage(props: TodoShowPageProps) {
    console.log(props);
    return <div>Show a todo</div>
}