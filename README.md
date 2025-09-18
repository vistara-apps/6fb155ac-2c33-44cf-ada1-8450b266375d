# MemoryVault - Base Mini App

A Base Wallet MiniApp for crafting digital memory books with AI storytelling and one-click NFT minting.

## Features

- **Automated Scrapbook Curation**: Upload photos, videos, and text to create organized digital memory books
- **AI-Powered Storytelling**: Generate contextual prompts to add narrative depth to your memories
- **One-Click NFT Minting**: Turn your memory books into NFTs on the Base network
- **Selective Sharing**: Control who can view your memories with public, private, or token-gated access

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base network integration via MiniKit and OnchainKit
- **AI**: OpenAI/OpenRouter for storytelling prompts
- **Storage**: IPFS via Pinata for decentralized storage
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd memoryvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from [OnchainKit](https://onchainkit.xyz)
   - `OPENROUTER_API_KEY` or `OPENAI_API_KEY`: For AI prompt generation
   - `PINATA_API_KEY` and `PINATA_SECRET_KEY`: For IPFS storage

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Home page
├── create/            # Memory book creation flow
├── api/               # API routes
│   ├── ai-prompt/     # AI prompt generation
│   ├── frame/         # Farcaster frame handling
│   └── og/            # Open Graph image generation
└── providers.tsx      # MiniKit and OnchainKit providers

components/
├── AppShell.tsx       # Main app layout
├── HeroSection.tsx    # Landing page hero
├── MemoryBookGrid.tsx # Memory book display grid
├── CreateMemoryBook.tsx # Creation flow component
├── MediaGrid.tsx      # Media item display
├── AIPromptGenerator.tsx # AI storytelling prompts
├── NFTMintingButton.tsx # NFT minting interface
├── ShareSheet.tsx     # Sharing options
├── Header.tsx         # Navigation header
└── WalletConnect.tsx  # Wallet connection

lib/
├── types.ts           # TypeScript type definitions
├── utils.ts           # Utility functions
└── constants.ts       # App configuration
```

## Key Features Implementation

### 1. Memory Book Creation
- Multi-step creation flow (Upload → Organize → Story → Mint)
- Drag-and-drop media upload
- Automatic organization and curation
- Caption and metadata editing

### 2. AI Storytelling
- Context-aware prompt generation using OpenAI/OpenRouter
- Fallback prompts for offline functionality
- Interactive prompt refinement
- Story response collection

### 3. NFT Minting
- One-click minting to Base network
- IPFS metadata storage
- Gas estimation and cost display
- Transaction status tracking
- Success/error handling

### 4. Sharing & Privacy
- Public, private link, and token-gated sharing
- Farcaster integration for social sharing
- Access control management
- Share link generation

## Base Mini App Integration

This app is built as a Base Mini App with:

- **MiniKit Provider**: Handles wallet connection and Base network integration
- **Farcaster Frames**: Interactive frames for in-app actions
- **OnchainKit Components**: Identity and wallet components
- **Frame Actions**: Add media, generate prompts, mint NFTs
- **Notifications**: Minting completion, sharing alerts

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=     # OnchainKit API key
NEXT_PUBLIC_BASE_URL=               # App base URL
OPENROUTER_API_KEY=                 # OpenRouter API key (preferred)
OPENAI_API_KEY=                     # OpenAI API key (alternative)
PINATA_API_KEY=                     # Pinata IPFS API key
PINATA_SECRET_KEY=                  # Pinata IPFS secret key
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=   # NFT contract address
```

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (recommended)
   ```bash
   vercel deploy
   ```

3. **Set environment variables** in your deployment platform

4. **Update manifest** with your production URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue in the repository
- Join our Discord community
- Check the Base Mini Apps documentation
