import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AstroApp',
  description: 'Your daily horoscope and zodiac compatibility app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider session={session}>
        <Navbar />
        <main className="min-h-screen pt-16 sm:pt-0">
          {children}
          <Footer />
        </main>
      </SessionProvider>
      </body>
    </html>
  );
}
