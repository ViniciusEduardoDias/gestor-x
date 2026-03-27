"use client"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { doc, collection, query, where, addDoc } from "firebase/firestore"
import { db } from "@/services/firebaseConnection";


import { IoMdArrowRoundBack } from "react-icons/io";
import TextArea from "@/components/TextArea";
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
    const { data: session } = useSession()

    const [input, setInput] = useState("")

    async function handleRegisterComent(event: FormEvent) {
        event.preventDefault()
        if (input === "" || !session?.user || !session?.user?.name) {
            return
        }
        try {
            const docRef = await addDoc(collection(db, "coments"), {
                comment: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: task?.id
            })
            setInput("")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="py-16 flex min-h-[calc(100vh-190px)] flex-col items-center px-6 bg-gray-100">
            <div className="relative w-full max-w-[900px]">
                <Link href="/dashboard">< IoMdArrowRoundBack className="absolute top-0 left-4 hover:scale-110 hover:text-red-700 transition-all duration-150" size={18} /></Link>
            </div>
            <span className="text-2xl font-bold">Tarefa</span>
            <article className="relative w-full border-orange-500 border-4 my-10 px-6 py-10 rounded">
                <h1 className="text-2xl font-bold text-orange-500">
                    {task.tarefa}
                </h1>
                <p className="mt-4 whitespace-pre-wrap">
                    {task.desc}
                </p>
                <span className="mt-2 md:absolute md:bottom-2 md:right-2 text-gray-400 text-sm">
                    {`Criada em ${task.created.toLocaleDateString()}`}
                </span>
            </article>
            <main className="py-16 flex min-h-[calc(100vh-190px)] flex-col items-center bg-gray-100 gap-4">
                <h2 className="text-start font-bold text-2xl">Quantidade de Comentários</h2>
                <form onSubmit={handleRegisterComent} className="w-full">
                    <TextArea
                        placeholder="Digite aqui seu comentário..."
                        value={input}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                    />
                    <button type="submit" disabled={!session?.user} className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-800 font-bold text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Enviar Comentário</button>
                </form>

                <article className="relative w-full border my-10 px-6 py-10 rounded">
                    <div className="flex gap-2 items-center">
                        <span className="font-bold">Nome de quem comentou</span>
                        <span className="text-sm opacity-50">há tanto tempo</span>
                    </div>
                    <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </article>
            </main>
        </main>
    )
}
