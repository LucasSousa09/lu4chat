import { getServerSession } from 'next-auth'
import SessionProvider from '../components/SessionProvider';

import { Poppins } from "next/font/google";

import { Container } from "../components/Container";

import "./globals.css";

import type { Metadata } from "next";

const poppins = Poppins({ 
  weight: ['300','400','500','700'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "lu4chat",
  description: "Seu novo aplicativo de conversas on-line",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()
    
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <Container>
            {children}         
          </Container>
        </SessionProvider>
      </body>
    </html>
  );
}
