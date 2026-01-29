import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { prompt, forceJSON } = await request.json();
  
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const messages = forceJSON
    ? [
        { role: 'system', content: 'You are a code analysis assistant. Always respond with valid JSON only, no markdown.' },
        { role: 'user', content: prompt }
      ]
    : [{ role: 'user', content: prompt }];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.3,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json({ error: error.message || 'API error' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json({ content: data.choices[0].message.content });
}
