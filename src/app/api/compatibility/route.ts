import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { sign1, sign2 } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert astrologer specializing in zodiac compatibility."
        },
        {
          role: "user",
          content: `Provide a brief compatibility reading for ${sign1} and ${sign2}. Focus on their relationship potential and key areas of harmony or conflict.`
        }
      ],
      max_tokens: 200,
    });

    const compatibility = completion.choices[0].message.content;

    return NextResponse.json({ compatibility });
  } catch (error) {
    console.error('Error generating compatibility:', error);
    return NextResponse.json({ error: 'Failed to generate compatibility reading' }, { status: 500 });
  }
}
