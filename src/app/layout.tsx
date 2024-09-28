import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AstroApp',
  description: 'Your daily horoscope and zodiac compatibility app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Navbar />
          <main className="min-h-screen ">
            {children}
            <Footer />
          </main>
        </body>
      </AuthProvider>
    </html>
  )
}
