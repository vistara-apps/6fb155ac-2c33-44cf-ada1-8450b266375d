'use client'

import { useState } from 'react'
import { Coins, CheckCircle, AlertCircle, Loader } from 'lucide-react'

interface MemoryBook {
  title: string
  description: string
  items: Array<{
    id: string
    type: string
    url?: string
    content?: string
    caption?: string
  }>
}

interface NFTMintingButtonProps {
  memoryBook: MemoryBook
  onMintSuccess?: (tokenId: string) => void
  onMintError?: (error: string) => void
  variant?: 'default' | 'minting' | 'success' | 'error'
}

export function NFTMintingButton({
  memoryBook,
  onMintSuccess,
  onMintError,
  variant = 'default'
}: NFTMintingButtonProps) {
  const [mintingState, setMintingState] = useState<'idle' | 'preparing' | 'uploading' | 'minting' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string>('')
  const [tokenId, setTokenId] = useState<string>('')
  const [estimatedCost, setEstimatedCost] = useState<string>('~$2.50')

  const handleMint = async () => {
    try {
      setMintingState('preparing')
      setError('')

      // Step 1: Prepare metadata
      const metadata = {
        name: memoryBook.title,
        description: memoryBook.description,
        image: memoryBook.items.find(item => item.type === 'image')?.url || '',
        attributes: [
          {
            trait_type: 'Items Count',
            value: memoryBook.items.length
          },
          {
            trait_type: 'Created Date',
            value: new Date().toISOString().split('T')[0]
          },
          {
            trait_type: 'Type',
            value: 'Memory Book'
          }
        ],
        external_url: `${window.location.origin}/book/${Date.now()}`,
        animation_url: '', // Could be a slideshow or interactive version
      }

      // Step 2: Upload to IPFS (simulated)
      setMintingState('uploading')
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate upload

      // Step 3: Mint NFT (simulated)
      setMintingState('minting')
      await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate minting

      // Success
      const mockTokenId = `${Date.now()}`
      setTokenId(mockTokenId)
      setMintingState('success')
      onMintSuccess?.(mockTokenId)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Minting failed'
      setError(errorMessage)
      setMintingState('error')
      onMintError?.(errorMessage)
    }
  }

  const getButtonContent = () => {
    switch (mintingState) {
      case 'preparing':
        return (
          <>
            <Loader size={20} className="animate-spin" />
            <span>Preparing...</span>
          </>
        )
      case 'uploading':
        return (
          <>
            <Loader size={20} className="animate-spin" />
            <span>Uploading to IPFS...</span>
          </>
        )
      case 'minting':
        return (
          <>
            <Loader size={20} className="animate-spin" />
            <span>Minting NFT...</span>
          </>
        )
      case 'success':
        return (
          <>
            <CheckCircle size={20} />
            <span>Minted Successfully!</span>
          </>
        )
      case 'error':
        return (
          <>
            <AlertCircle size={20} />
            <span>Try Again</span>
          </>
        )
      default:
        return (
          <>
            <Coins size={20} />
            <span>Mint as NFT</span>
          </>
        )
    }
  }

  const getButtonClass = () => {
    switch (mintingState) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white'
      case 'error':
        return 'bg-red-600 hover:bg-red-700 text-white'
      case 'preparing':
      case 'uploading':
      case 'minting':
        return 'bg-primary/50 text-white cursor-not-allowed'
      default:
        return 'bg-primary hover:bg-blue-600 text-white'
    }
  }

  return (
    <div className="space-y-4">
      {/* Cost Estimation */}
      <div className="bg-background rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Estimated Cost:</span>
          <span className="text-sm font-medium text-text-primary">{estimatedCost}</span>
        </div>
        
        <div className="text-xs text-text-secondary space-y-1">
          <div className="flex justify-between">
            <span>Minting Fee:</span>
            <span>$2.00</span>
          </div>
          <div className="flex justify-between">
            <span>Gas Fee:</span>
            <span>~$0.50</span>
          </div>
          <div className="flex justify-between border-t border-gray-700 pt-1 font-medium">
            <span>Total:</span>
            <span>{estimatedCost}</span>
          </div>
        </div>
      </div>

      {/* Minting Button */}
      <button
        onClick={handleMint}
        disabled={mintingState !== 'idle' && mintingState !== 'error'}
        className={`w-full flex items-center justify-center space-x-2 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 ${getButtonClass()}`}
      >
        {getButtonContent()}
      </button>

      {/* Status Messages */}
      {mintingState === 'success' && tokenId && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-green-400 font-medium">NFT Minted Successfully!</span>
          </div>
          <p className="text-sm text-text-secondary">
            Token ID: {tokenId}
          </p>
          <div className="mt-3 flex items-center space-x-3">
            <button className="text-sm bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors duration-200">
              View on Explorer
            </button>
            <button className="text-sm text-green-400 hover:text-green-300 transition-colors duration-200">
              Share NFT
            </button>
          </div>
        </div>
      )}

      {mintingState === 'error' && error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle size={16} className="text-red-400" />
            <span className="text-red-400 font-medium">Minting Failed</span>
          </div>
          <p className="text-sm text-text-secondary">{error}</p>
        </div>
      )}

      {/* Progress Indicator */}
      {(mintingState === 'preparing' || mintingState === 'uploading' || mintingState === 'minting') && (
        <div className="bg-background rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Loader size={16} className="animate-spin text-primary" />
            <div className="flex-1">
              <div className="text-sm text-text-primary font-medium mb-1">
                {mintingState === 'preparing' && 'Preparing your memory book...'}
                {mintingState === 'uploading' && 'Uploading to decentralized storage...'}
                {mintingState === 'minting' && 'Creating your NFT on Base...'}
              </div>
              <div className="text-xs text-text-secondary">
                This may take a few moments. Please don't close this window.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
