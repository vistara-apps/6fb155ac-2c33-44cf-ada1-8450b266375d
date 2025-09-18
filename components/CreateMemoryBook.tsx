'use client'

import { useState } from 'react'
import { MediaGrid } from './MediaGrid'
import { AIPromptGenerator } from './AIPromptGenerator'
import { NFTMintingButton } from './NFTMintingButton'
import { ArrowLeft, Upload, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface MemoryItem {
  id: string
  type: 'image' | 'video' | 'text'
  url?: string
  content?: string
  caption?: string
}

export function CreateMemoryBook() {
  const [step, setStep] = useState<'upload' | 'organize' | 'story' | 'mint'>('upload')
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>([])
  const [bookTitle, setBookTitle] = useState('')
  const [bookDescription, setBookDescription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleMediaUpload = (files: FileList) => {
    const newItems: MemoryItem[] = Array.from(files).map((file, index) => ({
      id: `item-${Date.now()}-${index}`,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: URL.createObjectURL(file),
      caption: '',
    }))
    
    setMemoryItems(prev => [...prev, ...newItems])
  }

  const handleNextStep = () => {
    switch (step) {
      case 'upload':
        setStep('organize')
        break
      case 'organize':
        setStep('story')
        break
      case 'story':
        setStep('mint')
        break
    }
  }

  const handlePrevStep = () => {
    switch (step) {
      case 'organize':
        setStep('upload')
        break
      case 'story':
        setStep('organize')
        break
      case 'mint':
        setStep('story')
        break
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
              <ArrowLeft size={24} className="text-text-secondary" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Create Memory Book</h1>
              <p className="text-text-secondary">
                {step === 'upload' && 'Upload your photos and videos'}
                {step === 'organize' && 'Organize and add details'}
                {step === 'story' && 'Add AI-powered storytelling'}
                {step === 'mint' && 'Mint your memory book as NFT'}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {['upload', 'organize', 'story', 'mint'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === stepName 
                    ? 'bg-primary text-white' 
                    : index < ['upload', 'organize', 'story', 'mint'].indexOf(step)
                    ? 'bg-primary/20 text-primary'
                    : 'bg-surface text-text-secondary'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < ['upload', 'organize', 'story', 'mint'].indexOf(step)
                      ? 'bg-primary'
                      : 'bg-surface'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="card-gradient rounded-xl p-6 shadow-card">
          {step === 'upload' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-text-primary mb-2">Upload Your Memories</h2>
                <p className="text-text-secondary">
                  Select photos, videos, and other media to include in your memory book
                </p>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors duration-200">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => e.target.files && handleMediaUpload(e.target.files)}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <Upload size={48} className="text-text-secondary mx-auto mb-4" />
                  <p className="text-text-primary font-medium mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-text-secondary text-sm">
                    PNG, JPG, GIF, MP4 up to 10MB each
                  </p>
                </label>
              </div>

              {/* Uploaded Items Preview */}
              {memoryItems.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">
                    Uploaded Items ({memoryItems.length})
                  </h3>
                  <MediaGrid items={memoryItems} variant="selectable" />
                </div>
              )}
            </div>
          )}

          {step === 'organize' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-text-primary mb-2">Organize Your Book</h2>
                <p className="text-text-secondary">
                  Add titles, descriptions, and arrange your memories
                </p>
              </div>

              {/* Book Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="Enter a title for your memory book"
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Description
                  </label>
                  <textarea
                    value={bookDescription}
                    onChange={(e) => setBookDescription(e.target.value)}
                    placeholder="Describe what this memory book represents"
                    rows={3}
                    className="input-field w-full resize-none"
                  />
                </div>
              </div>

              {/* Media Organization */}
              {memoryItems.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">
                    Arrange Your Memories
                  </h3>
                  <MediaGrid items={memoryItems} variant="display" />
                </div>
              )}
            </div>
          )}

          {step === 'story' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-text-primary mb-2">Add Your Story</h2>
                <p className="text-text-secondary">
                  Use AI to help craft compelling narratives for your memories
                </p>
              </div>

              <AIPromptGenerator 
                context={`Memory book: ${bookTitle}. ${bookDescription}`}
                onPromptGenerated={(prompt) => console.log('Generated prompt:', prompt)}
              />
            </div>
          )}

          {step === 'mint' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-text-primary mb-2">Mint Your NFT</h2>
                <p className="text-text-secondary">
                  Turn your memory book into a permanent NFT on the Base network
                </p>
              </div>

              {/* Preview */}
              <div className="bg-surface rounded-lg p-6">
                <h3 className="text-lg font-medium text-text-primary mb-4">Preview</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-text-primary">{bookTitle || 'Untitled Memory Book'}</h4>
                    <p className="text-text-secondary text-sm">{bookDescription || 'No description'}</p>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {memoryItems.length} items • Ready to mint
                  </div>
                </div>
              </div>

              <NFTMintingButton
                memoryBook={{
                  title: bookTitle,
                  description: bookDescription,
                  items: memoryItems,
                }}
                onMintSuccess={(tokenId) => {
                  console.log('NFT minted successfully:', tokenId)
                  // Handle success
                }}
                onMintError={(error) => {
                  console.error('Minting failed:', error)
                  // Handle error
                }}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700">
            <button
              onClick={handlePrevStep}
              disabled={step === 'upload'}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button
              onClick={handleNextStep}
              disabled={
                (step === 'upload' && memoryItems.length === 0) ||
                (step === 'organize' && !bookTitle.trim()) ||
                isProcessing
              }
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 'mint' ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
