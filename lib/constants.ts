export const APP_CONFIG = {
  name: 'MemoryVault',
  description: 'Craft, share, and immortalize your memories as NFTs',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  version: '1.0.0',
}

export const CHAIN_CONFIG = {
  chainId: 8453, // Base mainnet
  name: 'Base',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org',
}

export const NFT_CONFIG = {
  contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '',
  mintPrice: '0.002', // ETH
  maxSupply: 10000,
}

export const STORAGE_CONFIG = {
  ipfsGateway: 'https://gateway.pinata.cloud/ipfs/',
  pinataApiKey: process.env.PINATA_API_KEY || '',
  pinataSecretKey: process.env.PINATA_SECRET_KEY || '',
}

export const AI_CONFIG = {
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
  model: 'google/gemini-2.0-flash-001',
  maxTokens: 150,
  temperature: 0.8,
}

export const FRAME_CONFIG = {
  version: 'vNext',
  imageAspectRatio: '1.91:1',
  buttons: {
    max: 4,
    maxLength: 32,
  },
}

export const MEDIA_CONFIG = {
  maxFileSize: {
    image: 10 * 1024 * 1024, // 10MB
    video: 50 * 1024 * 1024, // 50MB
  },
  supportedFormats: {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    video: ['video/mp4', 'video/webm', 'video/ogg'],
  },
}

export const SHARE_CONFIG = {
  types: ['public', 'private', 'gated'] as const,
  farcasterComposeUrl: 'https://warpcast.com/~/compose',
}
