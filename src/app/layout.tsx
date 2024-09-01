import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Navigation from "@/components/Organism/navigation";
import { FOOTER } from "@/constants/navigation";
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
          <Navigation></Navigation>
        </header>
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <div>{children}</div>
        </div>
        <footer className="text-gray-600 body-font">
          <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a
              href="/QueryPlanShare/Top"
              className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
            >
              <Image src="/favicon.ico" height={54} width={54} alt="favicon" />
              <span className="ml-3 text-xl">QueryPlanShare</span>
            </a>
            <div className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
              © 2024 QueryPlanShare —
              <a
                href="https://twitter.com/knyttneve"
                className="text-gray-600 ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                @sickboy0001
              </a>
            </div>
            <div className="px-3 text-base ">
              [
              {FOOTER.map((each, key) => (
                <Link
                  key={key}
                  className=" hover:text-gray-900"
                  href={each.url}
                >
                  {each.displayName}
                </Link>
              ))}
              ]
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
