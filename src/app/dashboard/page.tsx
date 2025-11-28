import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FaTrash } from "react-icons/fa";

import TextArea from "@/components/TextArea";

import Head from "next/head";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="max-w-[900px] mx-auto p-4 w-full flex flex-col items-center md:max-w-[900px]">
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>
      <header className="w-full mb-10 flex justify-center">
        <h1 className="text-white">Meu painel de tarefas</h1>
      </header>
      <section className="w-full flex flex-col gap-6">
        <h1 className="text-3xl text-white">Qual sua tarefa?</h1>
        <form action="">
          <input
            type="text"
            placeholder="Digite sua tarefa aqui"
            className="w-full px-4 py-2 mb-4"
          />
          <TextArea placeholder="Descrição da sua tarefa aqui" />
          <div className="flex gap-2 items-center justify-start text-white">
            <input type="checkbox" className="rounded w-6 h-6" />
            <label>Deixar sua tarefa pública?</label>
          </div>
          <button
            className="w-full mt-6 px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition"
            type="submit"
          >
            Registrar
          </button>
        </form>
      </section>
      <section className="w-full rounded mt-10 bg-slate-50">
        <h2 className="text-2xl mt-10 mb-4 text-center">Suas tarefas</h2>
        <hr className="mx-6"></hr>
        <div className="flex flex-col gap-4">
          {/* Aqui serão listadas as tarefas do usuário */}
          <div className="w-100% p-4 rounded">
            <div className="flex gap-2">
              <h3 className="text-xl">Tarefa Exemplo</h3>
              <span className="bg-blue-500 text-sm text-white rounded px-2 py-1">
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
        </div>
      </section>
    </div>
  );
}
