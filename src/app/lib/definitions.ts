export type Task = {
    name: string,
    description: string | null,
    deadline: Date,
    completedAt: Date | null
}
