'use client'

import { useState, useEffect } from 'react'
import { Plus, Eye, Share2 } from 'lucide-react'
import Link from 'next/link'

interface MemoryBook {
  id: string
  title: string
  description: string
  mediaCount: number
  createdAt: string
  thumbnailUrl?: string
  isNFT: boolean
}

export function MemoryBookGrid() {
  const [memoryBooks, setMemoryBooks] = useState<MemoryBook[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading memory books
    const loadMemoryBooks = async () => {
      setIsLoading(true)
      
      // Mock data for demonstration
      const mockBooks: MemoryBook[] = [
        {
          id: '1',
          title: 'Summer Vacation 2024',
          description: 'Amazing trip to the mountains with friends',
          mediaCount: 12,
          createdAt: '2024-01-15',
          isNFT: true,
        },
        {
          id: '2',
          title: 'Wedding Memories',
          description: 'The most beautiful day of our lives',
          mediaCount: 25,
          createdAt: '2024-01-10',
          isNFT: false,
        },
      ]
      
      setTimeout(() => {
        setMemoryBooks(mockBooks)
        setIsLoading(false)
      }, 1000)
    }

    loadMemoryBooks()
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Your Memory Books</h2>
          <p className="text-text-secondary">Create and manage your digital memory collections</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="card-gradient rounded-xl p-6 shadow-card">
                <div className="h-32 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Your Memory Books</h2>
        <p className="text-text-secondary">Create and manage your digital memory collections</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Book Card */}
        <Link href="/create" className="group">
          <div className="card-gradient rounded-xl p-6 shadow-card border-2 border-dashed border-gray-600 hover:border-primary transition-colors duration-200 h-full flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-200">
              <Plus size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Create New Book</h3>
            <p className="text-text-secondary text-center text-sm">
              Start crafting your next memory collection
            </p>
          </div>
        </Link>

        {/* Memory Books */}
        {memoryBooks.map((book) => (
          <div key={book.id} className="group">
            <div className="card-gradient rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow duration-200">
              {/* Thumbnail */}
              <div className="h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 flex items-center justify-center">
                {book.thumbnailUrl ? (
                  <img 
                    src={book.thumbnailUrl} 
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-500">
                    <Eye size={32} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                    {book.title}
                  </h3>
                  {book.isNFT && (
                    <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
                      NFT
                    </span>
                  )}
                </div>
                
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{book.mediaCount} items</span>
                  <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Eye size={16} />
                  <span className="text-sm">View</span>
                </button>
                
                <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-200">
                  <Share2 size={16} />
                  <span className="text-sm">Share</span>
                </button>
                
                {!book.isNFT && (
                  <button className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full hover:bg-primary/30 transition-colors duration-200">
                    Mint NFT
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {memoryBooks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">No Memory Books Yet</h3>
          <p className="text-text-secondary mb-6">
            Create your first digital memory book to get started
          </p>
          <Link href="/create" className="btn-primary">
            Create Your First Book
          </Link>
        </div>
      )}
    </div>
  )
}
