import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function validateImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  return validTypes.includes(file.type) && file.size <= maxSize
}

export function validateVideoFile(file: File): boolean {
  const validTypes = ['video/mp4', 'video/webm', 'video/ogg']
  const maxSize = 50 * 1024 * 1024 // 50MB
  
  return validTypes.includes(file.type) && file.size <= maxSize
}

export function createShareUrl(bookId: string, isPrivate: boolean = false): string {
  const baseUrl = `${window.location.origin}/book/${bookId}`
  return isPrivate ? `${baseUrl}?token=${Date.now()}` : baseUrl
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function estimateGasCost(): string {
  // Mock gas estimation - in a real app, this would call the blockchain
  const baseFee = 0.0001 // ETH
  const gasPrice = 20 // Gwei
  const estimatedCost = baseFee * gasPrice
  return `~$${(estimatedCost * 2000).toFixed(2)}` // Assuming ETH price
}
