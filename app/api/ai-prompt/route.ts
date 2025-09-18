import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export async function POST(request: NextRequest) {
  try {
    const { context, mediaType, theme } = await request.json()

    const prompt = `Generate a thoughtful storytelling prompt for a digital memory book. 
    Context: ${context}
    Media type: ${mediaType}
    Theme: ${theme}
    
    Create a prompt that encourages the user to add meaningful narrative depth to their memory. 
    The prompt should be personal, engaging, and help them reflect on the emotions and significance of this moment.
    Keep it concise but evocative. Examples:
    - "What was the most surprising moment of this experience?"
    - "Describe the feeling you want to remember forever from this day."
    - "What would you tell your future self about this memory?"
    
    Return only the prompt text, nothing else.`

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a creative writing assistant specializing in memory storytelling prompts.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.8,
    })

    const generatedPrompt = completion.choices[0]?.message?.content?.trim()

    if (!generatedPrompt) {
      throw new Error('Failed to generate prompt')
    }

    return NextResponse.json({ prompt: generatedPrompt })
  } catch (error) {
    console.error('AI Prompt generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI prompt' },
      { status: 500 }
    )
  }
}
