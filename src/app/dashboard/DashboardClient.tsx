"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import TextArea from "@/components/TextArea";

import { db } from "@/services/firebaseConnection";
import { addDoc, collection, query, orderBy, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";

import Link from "next/link";

type Props = {
    userEmail: string;
};

interface TaskProps {
    user: string,
    id: string,
    created: Date,
    public: boolean,
    tarefa: string,
    desc: string
}

export default function DashboardClient({ userEmail }: Props) {
    const [inputDesc, setInputDesc] = useState("");
    const [inputTask, setInputTask] = useState("");
    const [checkedPubli, setCheckedPublic] = useState(false);
    const [tasks, setTasks] = useState<TaskProps[]>([])


    useEffect(() => {
        async function loadTarefas() {
            const tarefasRef = collection(db, "tarefas")
            const q = query(
                tarefasRef,
                orderBy("created", "desc"),
                where("user", "==", userEmail)
            )

            onSnapshot(q, (snapshot) => {
                let lista = [] as TaskProps[]
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        created: doc.data().createad,
                        user: doc.data().user,
                        public: doc.data().public,
                        desc: doc.data().desc
                    })
                })
                setTasks(lista)
            })
        }
        loadTarefas()
    }, [userEmail])

    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault();

        if (inputTask === "" || inputDesc === "") {
            alert("PREENCHA A TAREFA E A DESCRIÇÃO PARA CADASTRAR!")
        }

        try {
            await addDoc(collection(db, "tarefas"), {
                tarefa: inputTask,
                created: new Date(),
                user: userEmail,
                public: checkedPubli,
                desc: inputDesc
            })
            setInputTask("")
            setInputDesc("")
            setCheckedPublic(false)
        } catch (err) {
            console.error("Firebase error:", err);
        }
    }

    async function deleteRegisterTask(id: string) {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    async function handleShare(id: string) {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/task/${id}`)
        alert("URL Copiada com sucesso!")
    }

    return (
        <div className="max-w-[900px] mx-auto p-4 w-full flex flex-col items-center">
            <section className="w-full flex flex-col gap-6 my-10">
                <h1 className="text-3xl text-white">Qual tarefa deseja inserir?</h1>

                <form onSubmit={handleRegisterTask}>
                    <input
                        type="text"
                        placeholder="Digite sua tarefa aqui..."
                        className="w-full px-4 py-2 mb-4"
                        value={inputTask}
                        onChange={(e) => setInputTask(e.target.value)}
                    />

                    <TextArea
                        placeholder="Descrição da sua tarefa aqui..."
                        value={inputDesc}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setInputDesc(e.target.value)
                        }
                    />

                    <div className="flex gap-2 items-center text-white">
                        <input
                            type="checkbox"
                            checked={checkedPubli}
                            onChange={(e) => setCheckedPublic(e.target.checked)}
                        />
                        <label>Deixar sua tarefa pública?</label>
                    </div>

                    <button
                        className="w-full mt-6 px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition-transform duration-[0.4s] hover:scale-105"
                        type="submit"
                    >
                        Registrar
                    </button>
                </form>
            </section>

            <section className="w-full bg-white px-10 py-10 rounded-md">
                <h1 className="text-center text-3xl">Minhas tarefas</h1>
                {tasks.map((item) => (
                    <article key={item.id} className="flex justify-between mb-4 p-4 rounded-md border">

                        <div>
                            {item.public ? (
                                <Link href={`/task/${item.id}`}>
                                    <h2 className="text-xl font-bold">{item.tarefa}</h2>
                                </Link>
                            ) : <h2 className="text-xl font-bold">{item.tarefa}</h2>
                            }
                            <p>{item.desc}</p>
                        </div>

                        <div className="flex flex-col gap-4 items-end justify-center">
                            {item.public && (
                                <div className="flex gap-4 ">
                                    <FaShare className="text-blue-700" onClick={() => { handleShare(item.id) }} />
                                    <label className="bg-blue-500 hoverbg-blue-700 rounded-md text-white px-4 py-2 mr-2">PUBLICO</label>
                                </div>
                            )}
                            < FaTrash className="hover:scale-110 hover:text-red-700 transition-all duration-150" size={18} onClick={() => { deleteRegisterTask(item.id) }} />
                        </div>
                    </article>
                )
                )}


            </section >

        </div >
    );
}
