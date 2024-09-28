import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="">
      <div className="pb-2">
        <p className="text-center text-slate-300">
          @{currentYear} Conçu et alimenté par{" "}
          <Link
            href={"https://byltek.xyz"}
            target="_blank"
            className="font-bold"
          >
            Byltek
          </Link>
        </p>
      </div>
    </footer>
  );
}
