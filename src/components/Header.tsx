import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black w-full px-8 pt-4 h-[150px]">
      <div className="w-full flex justify-between  md:max-w-[900px] mx-auto items-center">
        <Link href="/">
          <h1 className="font-bold text-white text-2xl md:text-3xl p-4">
            TAREFAS<span className="text-orange-500">+</span>
          </h1>
        </Link>
        <Link href="/dashboard" className="flex">
          <div className="bg-white px-2 py-1 rounded-lg">MEU PAINEL</div>
        </Link>
        <div className="px-4 py-2 rounded-lg font-bold text-white border border-white bg-none cursor-pointer transition-colors duration-300 hover:bg-white hover:text-black hover:scale-105">
          LOGIN
        </div>
      </div>
    </header>
  );
}
