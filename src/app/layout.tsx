import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { MENULOGIN } from "@/constants/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QueryPlanShare",
  description: "QueryPlanShare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <Image src="/favicon.ico" height={54} width={54} alt="favicon" />
              <span className="ml-3 text-xl">QueryPlanShare</span>
            </a>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
                {MENULOGIN.map((each, key) => (
                  <li className="nav-item" key={key}>
                    <Link className="mr-5 hover:text-gray-900" href={each.url}>
                      {each.displayName}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Button
            </button>
          </div>
        </header>
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <div>{children}</div>
        </div>
        <footer className="text-gray-600 body-font">
          <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <Image src="/favicon.ico" height={54} width={54} alt="favicon" />
              <span className="ml-3 text-xl">QueryPlanShare</span>
            </a>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
              © 2024 QueryPlanShare —
              <a
                href="https://twitter.com/knyttneve"
                className="text-gray-600 ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                @sickboy0001
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
