import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <section className="flex flex-col items-center justify-center text-center px-6 py-16 bg-gray-50">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
            Bem-vindo ao GestorX
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl">
            Simplifique a gestão do seu negócio com nossa plataforma intuitiva e
            eficiente.
          </p>
          <Image
            src="/assets/tasks.png"
            alt="Imagem de Gestão"
            width={800}
            height={600}
            className="w-full max-w-3xl mb-8 rounded-lg shadow-lg"
          />
          <a
            href="#"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Comece Agora
          </a>
        </section>
      </main>
    </div>
  );
}
