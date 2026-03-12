"use client"

type Task = {
    id: string
    tarefa: string
    desc: string
    created: Date
    public: boolean
}

type Props = {
    task: Task
}

export default function DetailsTask({ task }: Props) {

    return (
        <main className="flex h-[calc(100vh-190px)] flex-col items-center justify-center px-6 bg-black text-gray-100">

            <h1 className="text-white text-2xl">
                {task.tarefa}
            </h1>

            <p className="mt-4">
                {task.desc}
            </p>

            <span className="text-gray-400 text-sm">
                {String(task.created)}
            </span>

        </main>
    )
}