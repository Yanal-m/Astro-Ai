import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { sign } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert astrologer specializing in zodiac compatibility."
        },
        {
          role: "user",
          content: `Generate a list of 3 famous celebrities who share a horoscope sign with ${sign}. Include a variety of public figures from different industries such as entertainment, sports, politics, and business. For each celebrity, provide their full name, profession, and a brief note on their most notable accomplishments.`
        }
      ],
      max_tokens: 200,
    });

    const celebrities = completion.choices[0].message.content;

    return NextResponse.json({ celebrities });
  } catch (error) {
    console.error('Error generating celebrities:', error);
    return NextResponse.json({ error: 'Failed to generate celebrities reading' }, { status: 500 });
  }
}
