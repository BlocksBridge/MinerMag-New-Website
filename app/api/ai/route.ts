import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export default async function POST(req: NextRequest, res: NextResponse) {
  const { body }: { body: { headline: string } } = await req.json();

  if (!body || (body && body.headline)) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    organization: process.env.OPENAI_ORG,
  });
  let generateSearchQuery = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are Search Assistant, Your Job is to find the company name from the Article Headline which will be used as Search Query",
      },
      { role: "user", content: `Here is the headline: ${body.headline}` },
    ],
  });

  console.log(generateSearchQuery.choices[0]);

  return NextResponse.json({ message: "Hello World" });
}
