'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-bold text-blue-600">
              SSyncSpace
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/portfolio" className="text-gray-600 hover:text-blue-600 transition-colors">
                Portfolio
              </Link>
              <Link href="/discord" className="text-gray-600 hover:text-blue-600 transition-colors">
                Discord Events
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {session.user?.name}!
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => signOut()}
                  size="sm"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => signIn('discord')}
                size="sm"
              >
                Sign In with Discord
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
