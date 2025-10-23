export default function Header() {
  return (
    <header className="bg-black w-full px-8 py-4">
      <div className="w-full flex justify-between  md:max-w-[900px] mx-auto items-center">
        <div>
          <h1 className="font-bold text-white text-2xl md:text-3xl p-4">
            TAREFAS<span className="text-orange-500">+</span>
          </h1>
        </div>
        <div className="px-4 py-2 rounded-3xl text-white border border-white bg-none cursor-pointer transition-colors duration-300 hover:scale-105">
          LOGIN
        </div>
      </div>
    </header>
  );
}
