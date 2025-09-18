'use client'

import { useState } from 'react'
import { X, Edit3, Play } from 'lucide-react'

interface MemoryItem {
  id: string
  type: 'image' | 'video' | 'text'
  url?: string
  content?: string
  caption?: string
}

interface MediaGridProps {
  items: MemoryItem[]
  variant?: 'selectable' | 'display'
  onItemUpdate?: (id: string, updates: Partial<MemoryItem>) => void
  onItemRemove?: (id: string) => void
}

export function MediaGrid({ 
  items, 
  variant = 'display',
  onItemUpdate,
  onItemRemove 
}: MediaGridProps) {
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editCaption, setEditCaption] = useState('')

  const handleEditStart = (item: MemoryItem) => {
    setEditingItem(item.id)
    setEditCaption(item.caption || '')
  }

  const handleEditSave = (itemId: string) => {
    onItemUpdate?.(itemId, { caption: editCaption })
    setEditingItem(null)
    setEditCaption('')
  }

  const handleEditCancel = () => {
    setEditingItem(null)
    setEditCaption('')
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        <p>No media items yet. Upload some photos or videos to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="group relative">
          <div className="bg-surface rounded-lg overflow-hidden shadow-card">
            {/* Media Content */}
            <div className="aspect-square relative">
              {item.type === 'image' && item.url && (
                <img
                  src={item.url}
                  alt={item.caption || 'Memory item'}
                  className="w-full h-full object-cover"
                />
              )}
              
              {item.type === 'video' && item.url && (
                <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                      <Play size={20} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {item.type === 'text' && (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center p-4">
                  <p className="text-text-primary text-center text-sm">
                    {item.content || 'Text content'}
                  </p>
                </div>
              )}

              {/* Overlay Actions */}
              {variant === 'selectable' && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleEditStart(item)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                  >
                    <Edit3 size={16} className="text-white" />
                  </button>
                  
                  <button
                    onClick={() => onItemRemove?.(item.id)}
                    className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-colors duration-200"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="p-3">
              {editingItem === item.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    placeholder="Add a caption..."
                    className="input-field w-full text-sm"
                    autoFocus
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditSave(item.id)}
                      className="text-xs bg-primary text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-text-secondary">
                  {item.caption || 'No caption'}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
