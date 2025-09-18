import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { untrustedData } = body

    // Handle frame button interactions
    const buttonIndex = untrustedData?.buttonIndex

    let responseHtml = ''

    switch (buttonIndex) {
      case 1:
        // Create Memory Book button
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og?action=create" />
              <meta property="fc:frame:button:1" content="Add Media" />
              <meta property="fc:frame:button:2" content="Generate Prompt" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame" />
              <title>Create Memory Book</title>
            </head>
            <body>
              <h1>Creating your memory book...</h1>
            </body>
          </html>
        `
        break
      default:
        // Default frame
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og" />
              <meta property="fc:frame:button:1" content="Create Memory Book" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame" />
              <title>MemoryVault</title>
            </head>
            <body>
              <h1>MemoryVault - Craft Your Digital Memories</h1>
            </body>
          </html>
        `
    }

    return new NextResponse(responseHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('Frame API error:', error)
    return NextResponse.json({ error: 'Frame processing failed' }, { status: 500 })
  }
}

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og" />
        <meta property="fc:frame:button:1" content="Create Memory Book" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame" />
        <title>MemoryVault</title>
      </head>
      <body>
        <h1>MemoryVault - Craft Your Digital Memories</h1>
      </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
