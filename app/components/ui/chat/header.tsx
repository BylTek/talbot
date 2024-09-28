import Image from "next/image";

export default function Header() {
  return (
    <nav className="flex max-w-5xl w-full items-center justify-between font-mono z-10">
      <div className="flex w-full items-center justify- dark:from-black dark:via-black lg:h-auto lg:w-auto lg:bg-none">
        {/* <span className="text-xl text-slate-100 font-bold px-2 md:flex hidden lg:block">
          TALbot
        </span> */}
        <Image
          className="rounded-md "
          src="/talbot.png"
          alt="Llama Logo"
          width={100}
          height={20}
          priority
        />
      </div>
      <div className="">
        <p className="text-xs lg:text-sm bg-red-600 text-white font-bold p-1 md:p-2 rounded">
          L&apos;utilisation de ce chatbot est à votre discrétion.
        </p>
      </div>
    </nav>
  );
}
