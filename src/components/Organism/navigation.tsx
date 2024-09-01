import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { MENUADMIN, MENUGUEST } from "@/constants/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QueryPlanShare",
  description: "QueryPlanShare",
};

export default function Navigation() {
  return (
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a
        href="/QueryPlanShare/Top"
        className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <Image src="/favicon.ico" height={54} width={54} alt="favicon" />
        <span className="ml-3 text-xl">QueryPlanShare</span>
      </a>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
          {MENUGUEST.map((each, key) => (
            <li className="nav-item" key={key}>
              <Link className="mr-5 hover:text-gray-900" href={each.url}>
                {each.displayName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
