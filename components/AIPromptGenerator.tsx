'use client'

import { useState } from 'react'
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react'

interface AIPromptGeneratorProps {
  context: string
  onPromptGenerated?: (prompt: string) => void
  variant?: 'textInput' | 'suggestions'
}

export function AIPromptGenerator({ 
  context, 
  onPromptGenerated,
  variant = 'suggestions' 
}: AIPromptGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [userResponse, setUserResponse] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const generatePrompt = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/ai-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context,
          mediaType: 'mixed',
          theme: 'personal_memory',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate prompt')
      }

      const data = await response.json()
      setCurrentPrompt(data.prompt)
      onPromptGenerated?.(data.prompt)
    } catch (error) {
      console.error('Error generating prompt:', error)
      // Fallback prompts
      const fallbackPrompts = [
        "What was the most surprising moment of this experience?",
        "Describe the feeling you want to remember forever from this day.",
        "What would you tell your future self about this memory?",
        "What made this moment special and worth preserving?",
        "How did this experience change you or your perspective?"
      ]
      const randomPrompt = fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)]
      setCurrentPrompt(randomPrompt)
      onPromptGenerated?.(randomPrompt)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyPrompt = async () => {
    if (currentPrompt) {
      await navigator.clipboard.writeText(currentPrompt)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Prompt Section */}
      <div className="bg-surface rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary flex items-center space-x-2">
            <Sparkles size={20} className="text-accent" />
            <span>AI Storytelling Prompt</span>
          </h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={generatePrompt}
              disabled={isGenerating}
              className="flex items-center space-x-2 text-sm bg-accent/20 text-accent px-3 py-2 rounded-lg hover:bg-accent/30 transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw size={16} className={isGenerating ? 'animate-spin' : ''} />
              <span>{isGenerating ? 'Generating...' : 'Generate New'}</span>
            </button>
            
            {currentPrompt && (
              <button
                onClick={copyPrompt}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            )}
          </div>
        </div>

        {currentPrompt ? (
          <div className="bg-background rounded-lg p-4 border-l-4 border-accent">
            <p className="text-text-primary italic">"{currentPrompt}"</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Sparkles size={32} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-4">
              Generate an AI-powered prompt to help tell your story
            </p>
            <button
              onClick={generatePrompt}
              disabled={isGenerating}
              className="btn-primary disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate Prompt'}
            </button>
          </div>
        )}
      </div>

      {/* Response Section */}
      {currentPrompt && variant === 'textInput' && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-text-primary">
            Your Response
          </label>
          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Share your thoughts and memories here..."
            rows={6}
            className="input-field w-full resize-none"
          />
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              {userResponse.length} characters
            </span>
            
            <button
              onClick={() => setUserResponse('')}
              className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Suggested Prompts */}
      {variant === 'suggestions' && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-text-primary">
            Or choose from these suggestions:
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              "What emotions does this memory bring back?",
              "Who were you with and what made it special?",
              "What details do you never want to forget?",
              "How has this memory influenced your life?",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPrompt(suggestion)
                  onPromptGenerated?.(suggestion)
                }}
                className="text-left p-3 bg-surface hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm text-text-secondary hover:text-text-primary"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
