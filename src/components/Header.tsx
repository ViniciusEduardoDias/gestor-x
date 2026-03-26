"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <header className="p-2 w-full flex flex-col md:flex-row justify-between md:max-w-[900px] mx-auto items-center">
      {/* Logo */}
      <Link href="/">
        <h1 className="font-bold text-white text-2xl md:text-3xl p-4">
          TAREFAS<span className="text-orange-500">+</span>
        </h1>
      </Link>
      <div className="flex w-full items-center justify-around">
        {/* Link para o painel */}
        {session?.user && pathname != "/dashboard" && (
          <Link href="/dashboard">
            <div className="px-3 py-1 rounded-lg font-semibold text-white hover:text-orange-500 transition">
              MEU PAINEL
            </div>
          </Link>
        )}

        {/* Sessão de autenticação */}
        {status === "loading" ? (
          <></>
        ) : session ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-white">
              Olá, {session.user?.name}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-orange-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-orange-600 transition"
            >
              <PiSignOut size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 rounded-lg font-bold text-white border border-white bg-transparent cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
          >
            LOGIN
          </button>
        )}
      </div>
    </header>
  );
}
