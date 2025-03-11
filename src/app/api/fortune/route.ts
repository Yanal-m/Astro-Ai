import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { name, birthday } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a mystical fortune teller skilled in numerology and tarot reading. Provide a three-paragraph reading based on the user's name and birthday. Answer within 150 tokens. "
        },
        {
          role: "user",
          content: `Generate a fortune reading for ${name}, born on ${birthday}. First paragraph: Analyze their personality based on numerology. Second paragraph: Perform a three-card tarot reading for past, present, and future. Third paragraph: Provide a mantra and guidance for achieving their desires. Answer strictly within 150 tokens.`
        }
      ],
      max_tokens: 150,
    });

    const reading = completion.choices[0].message.content;

    return NextResponse.json({ reading });
  } catch (error) {
    console.error('Error generating fortune:', error);
    return NextResponse.json({ error: 'Failed to generate fortune reading' }, { status: 500 });
  }
}
