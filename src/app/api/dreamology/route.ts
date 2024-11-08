import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { dream, birthday } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a skilled dream interpretation professional in interpretate dreams based on the user's dream and birthday."
        },
        {
          role: "user",
          content: `Generate a dream interpretation for ${dream}, born on ${birthday}. Based on the dream details and birthdate provided, offer a personalized interpretation that explores the possible meanings behind key symbols, emotions, and scenarios in the dream. Analyze the significance of these elements within the context of the user's life stage and personality traits associated with their birthdate.

If the dream features common symbols (e.g., flying, water, animals), explain both traditional interpretations and how these might uniquely apply to the user's experience. Conclude with a thoughtful perspective on how the dream might reflect the user's current emotions, desires, or challenges, and suggest any constructive actions or reflections they may benefit from in waking life.`
        }
      ],
      max_tokens: 300,
    });

    const reading = completion.choices[0].message.content;

    return NextResponse.json({ reading });
  } catch (error) {
    console.error('Error generating fortune:', error);
    return NextResponse.json({ error: 'Failed to generate fortune reading' }, { status: 500 });
  }
}
