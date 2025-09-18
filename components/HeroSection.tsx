'use client'

import Link from 'next/link'
import { Plus, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10"></div>
      
      <div className="relative px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Creates Your Digital
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Memory Books
            </span>
            <br />
            with AI Storytelling
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            Turn your memory journals into beautifully crafted digital books. 
            Document travel journals and life milestones with AI-generated storytelling.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/create"
              className="flex items-center space-x-2 bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg"
            >
              <Plus size={20} />
              <span>Create NFT</span>
            </Link>
            
            <button className="flex items-center space-x-2 bg-transparent border-2 border-gray-600 text-text-primary hover:border-gray-500 font-semibold py-4 px-8 rounded-xl transition-colors duration-200">
              <Sparkles size={20} />
              <span>Create NFT</span>
            </button>
          </div>
          
          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Sparkles size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">AI Storytelling</h3>
              <p className="text-sm text-text-secondary">
                Let AI help craft compelling narratives for your memories
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Plus size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">One-Click Minting</h3>
              <p className="text-sm text-text-secondary">
                Turn your memory books into NFTs with a single click
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Secure Sharing</h3>
              <p className="text-sm text-text-secondary">
                Control who can view your precious memories
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
