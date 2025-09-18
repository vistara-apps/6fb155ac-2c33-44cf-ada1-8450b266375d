'use client'

import { useState } from 'react'
import { Share2, Copy, Link, Lock, Globe, Users, X, Check } from 'lucide-react'

interface ShareSheetProps {
  memoryBook: {
    id: string
    title: string
    description: string
    isNFT: boolean
  }
  isOpen: boolean
  onClose: () => void
  variant?: 'default' | 'gated'
}

export function ShareSheet({ memoryBook, isOpen, onClose, variant = 'default' }: ShareSheetProps) {
  const [shareType, setShareType] = useState<'public' | 'private' | 'gated'>('public')
  const [isCopied, setIsCopied] = useState(false)
  const [gatingCriteria, setGatingCriteria] = useState('')

  const shareUrl = `${window.location.origin}/book/${memoryBook.id}`
  const privateUrl = `${shareUrl}?token=${Date.now()}`

  const handleCopyLink = async () => {
    const urlToCopy = shareType === 'private' ? privateUrl : shareUrl
    await navigator.clipboard.writeText(urlToCopy)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleFarcasterShare = () => {
    const text = `Check out my memory book: "${memoryBook.title}"`
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-text-primary">Share Memory Book</h3>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Memory Book Preview */}
          <div className="bg-background rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-1">{memoryBook.title}</h4>
            <p className="text-sm text-text-secondary mb-2">{memoryBook.description}</p>
            {memoryBook.isNFT && (
              <span className="inline-block bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
                NFT
              </span>
            )}
          </div>

          {/* Share Type Selection */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-primary">Privacy Settings</h4>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 bg-background rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-200">
                <input
                  type="radio"
                  name="shareType"
                  value="public"
                  checked={shareType === 'public'}
                  onChange={(e) => setShareType(e.target.value as any)}
                  className="text-primary"
                />
                <Globe size={20} className="text-text-secondary" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Public</div>
                  <div className="text-xs text-text-secondary">Anyone can view this memory book</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-background rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-200">
                <input
                  type="radio"
                  name="shareType"
                  value="private"
                  checked={shareType === 'private'}
                  onChange={(e) => setShareType(e.target.value as any)}
                  className="text-primary"
                />
                <Link size={20} className="text-text-secondary" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Private Link</div>
                  <div className="text-xs text-text-secondary">Only people with the link can view</div>
                </div>
              </label>

              {memoryBook.isNFT && (
                <label className="flex items-center space-x-3 p-3 bg-background rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-200">
                  <input
                    type="radio"
                    name="shareType"
                    value="gated"
                    checked={shareType === 'gated'}
                    onChange={(e) => setShareType(e.target.value as any)}
                    className="text-primary"
                  />
                  <Lock size={20} className="text-text-secondary" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">Token Gated</div>
                    <div className="text-xs text-text-secondary">Require specific NFT or token to view</div>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Gating Criteria */}
          {shareType === 'gated' && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-text-primary">Access Requirements</h4>
              <input
                type="text"
                value={gatingCriteria}
                onChange={(e) => setGatingCriteria(e.target.value)}
                placeholder="Enter NFT contract address or token requirement"
                className="input-field w-full text-sm"
              />
              <p className="text-xs text-text-secondary">
                Only users holding the specified NFT or token can view this memory book
              </p>
            </div>
          )}

          {/* Share Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-primary">Share Options</h4>
            
            <div className="space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between p-3 bg-background hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  {isCopied ? <Check size={20} className="text-green-400" /> : <Copy size={20} className="text-text-secondary" />}
                  <span className="text-sm text-text-primary">
                    {isCopied ? 'Copied!' : 'Copy Link'}
                  </span>
                </div>
              </button>

              <button
                onClick={handleFarcasterShare}
                className="w-full flex items-center justify-between p-3 bg-background hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Share2 size={20} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">Share on Farcaster</span>
                </div>
              </button>
            </div>
          </div>

          {/* URL Preview */}
          <div className="bg-background rounded-lg p-3">
            <div className="text-xs text-text-secondary mb-1">Share URL:</div>
            <div className="text-xs text-text-primary font-mono break-all">
              {shareType === 'private' ? privateUrl : shareUrl}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
