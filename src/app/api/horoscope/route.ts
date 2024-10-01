import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { sign, timeframe, category } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a skilled astrologer. Provide a brief, engaging horoscope based on the given zodiac sign, timeframe, and category."
        },
        {
          role: "user",
          content: `Generate a ${timeframe.toLowerCase()} horoscope for ${sign} focusing on the ${category} aspect of their life. Keep it concise and relevant to the ${category} category.`
        }
      ],
      max_tokens: 250,
    });

    const horoscope = completion.choices[0].message.content;

    return NextResponse.json({ horoscope });
  } catch (error) {
    console.error('Error generating horoscope:', error);
    return NextResponse.json({ error: 'Failed to generate horoscope' }, { status: 500 });
  }
}
