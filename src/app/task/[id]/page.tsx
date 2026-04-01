import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import DetailsTask from "./DetailsTask";

type Task = {
    id: string
    tarefa: string
    desc: string
    created: Date
    public: boolean
}

export default async function Page({ params }: any) {

    const { id } = await params

    const docRef = doc(db, "tarefas", id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        redirect("/")
    }

    const data = snapshot.data()

    if (!data.public) {
        redirect("/")
    }

    const task: Task = {
        id: snapshot.id,
        tarefa: data.tarefa,
        desc: data.desc,
        created: new Date(data.created.seconds * 1000),
        public: data.public
    }

    return <DetailsTask task={task} />
}