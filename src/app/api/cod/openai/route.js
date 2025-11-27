import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { image, prompt } = await request.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { 
                type: 'text', 
                text: prompt || 'Extract all player statistics from this image and return as a JSON object with a "players" array. Each player object must include: playerName, kills, deaths. Return ONLY valid JSON, no additional text.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
        response_format: { type: "json_object" }, // Force JSON output
      }),
    });

    const data = await response.json();
    
    // Check for API errors
    if (data.error) {
      console.error('OpenAI Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }
    
    // Fixed: choices is an array, access first element
    console.log('Full response:', data);
    console.log('Message content:', data.choices[0].message.content);
    
    // Parse the JSON string and return it
    const parsedData = JSON.parse(data.choices[0].message.content);
    
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}