'use client'

import { useState } from 'react'
import { Home, Plus, User, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { WalletConnect } from './WalletConnect'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-gray-700">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MV</span>
            </div>
            <span className="font-bold text-xl text-text-primary">MemoryVault</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link href="/create" className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors">
              <Plus size={20} />
              <span>Create</span>
            </Link>
            <Link href="/profile" className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors">
              <User size={20} />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Wallet Connect & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <WalletConnect />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link 
                href="/create" 
                className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus size={20} />
                <span>Create</span>
              </Link>
              <Link 
                href="/profile" 
                className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
