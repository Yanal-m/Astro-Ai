'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/nextjs'
import { SparklesText } from "@/components/ui/sparkles-text"



export function SparklesTextDemo() {
  return <SparklesText text="Magic UI" />;
}

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Horoscope', path: '/horoscope' },
    { label: 'Compatibility', path: '/compatibility' },
    { label: 'Celebrities', path: '/celebrities' },
    { label: 'Fortune', path: '/fortune' },
    { label: 'Tasseography', path: '/tasseography' },
    { label: 'Dreams', path: '/dream-interpretation',
     }
  ]

  return (
    <nav className="bg-white md:bg-transparent backdrop-blur-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/">
            <SparklesText className="text-3xl text-center mt-2 text-white"  text="AstroAI" />
            </a>
          </div>
          <div className="hidden md:block items-center justify-between">
            <div className="ml-10 flex z-16 items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? 'bg-gradient-to-b from-cyan-500 to-purple-900 text-white'
                      : 'text-white hover:bg-cyan-500 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <button className='hidden md:block text-white text-sm font-medium'>
              <SignedOut>
              <SignInButton />
              </SignedOut>
              <SignedIn>
              <UserButton/>
              </SignedIn>
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-cyan-700 hover:text-cyan-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${
                  pathname === item.path
                    ? 'bg-cyan-900 text-white'
                    : 'text-gray-900 hover:bg-cyan-700 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <button className='bg-cyan-900 hover:bg-cyan-500 md:hidden text-white px-3 py-2 rounded-md text-sm font-medium'>
              <SignedOut>
              <SignInButton />
              </SignedOut>
              <SignedIn>
              <UserButton />
              </SignedIn>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
