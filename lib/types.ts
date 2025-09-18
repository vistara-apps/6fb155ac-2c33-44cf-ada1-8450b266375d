export interface User {
  id: string
  farcasterId?: string
  walletAddress?: string
  createdAt: string
}

export interface MemoryBook {
  id: string
  userId: string
  title: string
  description: string
  mediaUrls: string[]
  createdAt: string
  updatedAt: string
  nftContractAddress?: string
  tokenId?: string
}

export interface MemoryItem {
  id: string
  bookId: string
  type: 'image' | 'video' | 'text'
  url?: string
  content?: string
  caption?: string
  order: number
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  external_url?: string
  animation_url?: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
}

export interface AIPromptRequest {
  context: string
  mediaType: 'image' | 'video' | 'text' | 'mixed'
  theme: string
}

export interface AIPromptResponse {
  prompt: string
  suggestions?: string[]
}

export interface ShareSettings {
  type: 'public' | 'private' | 'gated'
  gatingCriteria?: string
  privateToken?: string
}
