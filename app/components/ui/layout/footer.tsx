import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";



export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="">
      {/* <div className="flex justify-center space-x-4 mt-4 lg:mt-0 px-2 py-4"> 
      <span className="text-slate-200">Have questions? Ask me on </span>
        <Link href={"https://www.instagram.com/iflis.illul/"} target="_blanck">
          <Instagram color="#fc3d43"/>
        </Link>
        {/* <Link href={"https://twitter.com/byltek"}>
          <Twitter color="#c7c3c4"/>
        </Link> }
      </div> */}

      <div className="pb-2">
        <p className="text-center text-slate-300">
          @{currentYear} Designed and powered by{" "}
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
