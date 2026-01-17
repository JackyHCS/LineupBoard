'use client'

import { useAuth } from '../contexts/AuthContext'
import { LogIn, LogOut, User } from 'lucide-react'

export default function LineupHeader() {
  const { user, loading, signInWithGoogle, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-[#0f1419] via-[#0f1419]/95 to-transparent ">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src="/assets/logo-transparent.png" alt="LineupBoard Logo" className="h-20 w-auto" />
            </a>
          </div>

          {/* Navigation links */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-8">
            <a href="#lineups" className="text-gray-300 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">
              Lineups
            </a>
            <a href="#board" className="text-gray-300 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">
              Board(Coming Soon)
            </a>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
            ) : user ? 
            (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.user_metadata?.name || 'User'}</span>
                </div>
                <button
                  onClick={signOut}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : 
            (
              <div className="flex items-center gap-2">
                <button
                  onClick={signInWithGoogle}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  Sign in with Google
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}