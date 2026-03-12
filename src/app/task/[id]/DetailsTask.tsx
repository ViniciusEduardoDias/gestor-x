"use client"
import Link from "next/link"
import { IoMdArrowRoundBack } from "react-icons/io";
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
        <main className="py-16 flex h-[calc(100vh-190px)] flex-col items-center px-6 bg-gray-100">
            <div className="relative w-full max-w-[900]">                <Link href="/">< IoMdArrowRoundBack className="absolute top-0 left-4 hover:scale-110 hover:text-red-700 transition-all duration-150" size={18} /></Link>
            </div>
            <span>Tarefa</span>
            <article className="relative w-full max-w[900] border p-6 rounded">
                <h1 className="text-2xl font-bold">
                    {task.tarefa}
                </h1>
                <p className="mt-4">
                    {task.desc}
                </p>
                <span className="mt-2 md:absolute md:bottom-2 md:right-2 text-gray-400 text-sm">
                    {`Criada em ${task.created.toLocaleDateString()}`}
                </span>
            </article>

        </main >
    )
}