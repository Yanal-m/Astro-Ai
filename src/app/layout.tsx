import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import Navbar from '../components/Navbar'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} relative min-h-screen`}>
          <div className="animated-gradient absolute inset-0 z-[-1]"></div>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}