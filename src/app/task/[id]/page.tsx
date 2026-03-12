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

export default async function Page({ params }: { params: { id: string } }) {

    const docRef = doc(db, "tarefas", params.id)
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
        created: data.created.toDate(),
        public: data.public
    }

    return <DetailsTask task={task} />
}
