import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      redirect: "/",
      destination: "/",
      permanent: false,
    };
  }

  return (
    <main>
      <h1 className="text-white">Dashboard</h1>
    </main>
  );
}
