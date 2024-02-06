import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Header } from '../components/Header'

import "./globals.css";

const poppins = Poppins({ 
  weight: ['300','400','500','700'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "lu4chat | Home",
  description: "Seu novo aplicativo de conversas on-line",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
