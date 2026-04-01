"use client"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, collection, query, where, addDoc, onSnapshot, orderBy, deleteDoc } from "firebase/firestore"
import { db } from "@/services/firebaseConnection";
import Toast from "@/components/Toast";
import Image from "next/image";

import TextArea from "@/components/TextArea";

import { IoMdArrowRoundBack, IoMdTrash } from "react-icons/io";


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

type Comment = {
    id: string
    comment: string
    name: string
    user: string
    created: Date
    taskId: string
    image?: string
}

export default function DetailsTask({ task }: Props) {
    const { data: session } = useSession()
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [comments, setComments] = useState<Comment[]>([])

    const [input, setInput] = useState("")

    useEffect(() => {

        const q = query(
            collection(db, "coments"),
            where("taskId", "==", task.id),
            orderBy("created", "desc")
        )
        const unsubscribe = onSnapshot(q, (snapshot) => {

            let list = [] as Comment[]

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    comment: doc.data().comment,
                    name: doc.data().name,
                    taskId: doc.data().taskId,
                    user: doc.data().user,
                    created: new Date(doc.data().created.seconds * 1000)
                })
            })

            setComments(list)
        })


        return () => unsubscribe()

    }, [task.id])
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
                taskId: task?.id,
                image: session?.user?.image,
            })
            setInput("")
            setToastMessage("Comentário adicionado com sucesso!")
            setShowToast(true)

        } catch (error) {
            console.log(error)
        }
    }

    async function deleteComent(id: string) {
        try {
            await deleteDoc(doc(db, "coments", id))

            setToastMessage("Comentário removido com sucesso!")
            setShowToast(true)

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
            <section id="Comments" className="w-full max-w-[1200px] py-16 flex min-h-[calc(100vh-190px)] flex-col items-center bg-gray-100">
                <h2 className="text-start font-bold text-2xl mb-4">{comments.length} {comments.length > 1 ? `comentários` : 'comentário'}</h2>
                <form onSubmit={handleRegisterComent} className="w-full">
                    <TextArea
                        placeholder="Digite aqui seu comentário..."
                        value={input}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                    />
                    <button type="submit" disabled={!session?.user} className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-800 font-bold text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Enviar Comentário</button>
                </form>

                {comments.map((coment) => (
                    <article key={coment.id} className="relative w-full border my-2 px-6 py-10">
                        <div className="flex gap-6">
                            <Image
                                src={coment.image || "/avatar.png"}
                                alt={coment.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <span className="font-bold">{coment.name}</span>
                                    <span className="absolute right-2 bottom-2 text-sm opacity-50">
                                        {coment.created.toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm">
                                    {coment.comment}
                                </p>
                            </div>
                        </div>
                        {session?.user?.email === coment.user && (
                            <IoMdTrash
                                size={20}
                                className="absolute right-2 top-2 text-gray-700 hover:text-orange-700 cursor-pointer"
                                onClick={() => deleteComent(coment.id)} />
                        )}
                    </article>
                ))}
            </section>
            <Toast
                message={toastMessage}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </main >
    )
}
