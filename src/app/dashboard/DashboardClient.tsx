"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FaTrash } from "react-icons/fa";
import TextArea from "@/components/TextArea";

import { db } from "@/services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

type Props = {
    userEmail: string;
};

export default function DashboardClient({ userEmail }: Props) {
    const [inputDesc, setInputDesc] = useState("");
    const [inputTask, setInputTask] = useState("");
    const [checkedPubli, setCheckedPublic] = useState(false);

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
                public: checkedPubli
            })
            setInputTask("")
            setInputDesc("")
            setCheckedPublic(false)
            console.log("API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY)

        } catch (err) {
            console.error("Firebase error:", err);
        }
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

                <div className="w-100% p-4 rounded">
                    <div className="flex gap-2">
                        <h3 className="text-xl">Tarefa Exemplo</h3>
                        <span className="bg-blue-500 text-sm text-white rounded px-2 py-1 hover:bg-blue-700">
                            Pública
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <p className="whitespace-pre-wrap">
                            Descrição da tarefa exemplo.
                        </p>
                        <FaTrash className="mt-2 text-red-500 cursor-pointer hover:scale-105" />
                    </div>
                </div>
                <hr></hr>
            </section>

        </div >
    );
}
