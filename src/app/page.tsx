import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-6 pt-8 pb-16 bg-black color-gray-100">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-100">
        Bem-vindo ao GestorX
      </h1>
      <p className="text-lg md:text-xl mb-4 text-gray-300 max-w-2xl">
        Simplifique a gestão do seu negócio com nossa plataforma intuitiva e
        eficiente.
      </p>
      <Image
        src="/assets/tasks.png"
        alt="Imagem de Gestão"
        width={300}
        height={100}
        className="mb-4"
      />
      <section className="flex gap-5 items-center justify-center">
        <div className="bg-slate-100 p-3 rounded-lg text-gray-900 hover:bg-orange-500 hover:text-white transition-colors duration-300 cursor-pointer hover:scale-105">
          <span>+12 posts</span>
        </div>
        <div className="bg-slate-100 p-3 rounded-lg text-gray-900 hover:bg-orange-500 hover:text-white transition-colors duration-300 cursor-pointer hover:scale-105">
          <span>+12 posts</span>
        </div>
      </section>
    </main>
  );
}
