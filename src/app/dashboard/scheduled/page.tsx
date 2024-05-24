import { getAllTasks } from "@/app/lib/tasks-api"

export default async function Page () {
    const myTasks = await getAllTasks()
    console.log("HERE ARE MA' TASKS BOI!", myTasks)
    return <div>Scheduled page</div>
}