'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { signOut, useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session }: any = useSession();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Compatibility', path: '/compatibility' },
    { label: 'Celebrities', path: '/celebrities' },
    { label: 'About Us', path: '/about' },
  ]

  return (
    <nav className="bg-white md:bg-transparent backdrop-blur-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/">
              <Image
                src="/logo-astro1.png"
                alt="AstroApp"
                width={150}
                height={100}
                priority
              />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? 'bg-cyan-700 text-white'
                      : 'text-white hover:bg-cyan-700 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {item.label}
                </Link>
              ))}
              <ul className="flex justify-between m-10 item-center">
              <div className="flex gap-10">
                {!session ? (
                  <>
                    <Link href="/login">
                      <li>Login</li>
                    </Link>
                    <Link href="/register">
                      <li>Register</li>
                    </Link>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          signOut();
                        }}
                        className="p-2 px-5 -mt-4 bg-cyan-600 rounded-full"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </div>
            </ul>
            </div>
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
            <ul className="flex justify-between m-10 item-center">
              <div className="flex gap-10">
                {!session ? (
                  <>
                    <Link href="/login">
                      <li>Login</li>
                    </Link>
                    <Link href="/register">
                      <li>Register</li>
                    </Link>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          signOut();
                        }}
                        className="p-2 px-5 -mt-4 bg-cyan-600 rounded-full"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </div>
            </ul>
        </div>  
      )}
    </nav>
  )
}

export default Navbar
