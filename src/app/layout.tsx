
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LowerBar from "@/components/navbar/LowerBar";
import Globals from "@/components/global/Globals";
import { useCityStorage } from "@/storage/city";

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
        <header className="flex flex-col items-center mt-10" >
        <img src='/logoPeriscopio.jpg' className='w-40' alt='imagem' />
        <p className="text-lgf pb-2 font-semibold font-sans italic bold">{}</p>
        </header>
        <main className="pb-16">
        {children}
        </main>
        <footer className="">
          <LowerBar/>
        </footer>
        </body>
    </html>
  );
}
