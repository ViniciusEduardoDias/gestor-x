import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

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
      <main className="w-full flex flex-col gap-6">
        <h1 className="text-3xl text-white">Qual sua tarefa?</h1>
        <form action="">
          <TextArea placeholder="Digite sua tarefa aqui" />
          <div className="flex gap-2 items-center justify-start text-white">
            <input type="checkbox" className="rounded w-6 h-6" />
            <label>Deixar sua tarefa pública?</label>
          </div>
          <button
            className="w-full mt-6 px-4 py-2 rounded bg-sky-800 text-white hover:bg-sky-900"
            type="submit"
          >
            Registrar
          </button>
        </form>
      </main>
    </div>
  );
}
