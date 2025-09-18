import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    const title = action === 'create' ? 'Creating Memory Book...' : 'MemoryVault'
    const subtitle = action === 'create' 
      ? 'Add your photos and let AI help tell your story'
      : 'Craft, share, and immortalize your memories as NFTs'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'white',
              padding: '40px',
            }}
          >
            <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#60a5fa' }}>
              {title}
            </h1>
            <p style={{ fontSize: '24px', color: '#d1d5db', maxWidth: '600px' }}>
              {subtitle}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('OG Image generation error:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}
