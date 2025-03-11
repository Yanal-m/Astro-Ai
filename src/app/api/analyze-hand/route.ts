import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }

    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",  // Update this line
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "You are a professional palm reader. Analyze this hand and provide a detailed interpretation based on the lines seen according to palmistry. Answer within 200 tokens." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 200,
    });

    const reading = response.choices[0].message.content;

    return NextResponse.json({ reading });
  } catch (error ) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred during your request.' }, { status: 500 });
  }
}