import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LowerBar from "@/components/navbar/LowerBar";
import CityLabel from "@/components/cityLabel/CityLabel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="mt-10 flex flex-col items-center">
          <img src="/logoPeriscopio.jpg" className="w-40" alt="imagem" />
          <CityLabel />
        </header>
        <main className="pb-16">{children}</main>
        <footer className="">
          <LowerBar />
        </footer>
      </body>
    </html>
  );
}
