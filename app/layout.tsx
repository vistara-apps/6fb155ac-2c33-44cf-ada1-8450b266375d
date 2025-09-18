import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MemoryVault - Craft, Share, and Immortalize Your Memories',
  description: 'A Base Wallet MiniApp for crafting digital memory books with AI storytelling and one-click NFT minting.',
  openGraph: {
    title: 'MemoryVault',
    description: 'Craft, share, and immortalize your memories as NFTs.',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL}/api/og`,
    'fc:frame:button:1': 'Create Memory Book',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
