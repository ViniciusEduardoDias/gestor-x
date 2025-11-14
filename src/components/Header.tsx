"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-black w-full px-8 pt-4 h-[150px]">
      <div className="w-full flex justify-between md:max-w-[900px] mx-auto items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-bold text-white text-2xl md:text-3xl p-4">
            TAREFAS<span className="text-orange-500">+</span>
          </h1>
        </Link>

        {/* Link para o painel */}
        {session?.user && (
          <Link href="/dashboard">
            <div className="bg-white px-3 py-1 rounded-lg font-semibold text-black hover:bg-gray-200 transition">
              MEU PAINEL
            </div>
          </Link>
        )}

        {/* Sessão de autenticação */}
        {status === "loading" ? (
          <></>
        ) : session ? (
          <div className="flex items-center gap-4">
            <span className="text-white">Olá, {session.user?.name}</span>
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
