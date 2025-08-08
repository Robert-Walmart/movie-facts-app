import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getMovieFact(movieTitle: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Tell me one interesting and fun fact about the movie "${movieTitle}". Keep it concise and engaging, around 1-2 sentences.`
        }
      ],
      max_tokens: 100,
      temperature: 0.8,
    });

    return completion.choices[0]?.message?.content || "No fact available at the moment.";
  } catch (error) {
    console.error('Error fetching movie fact:', error);
    return "Unable to fetch movie fact at the moment.";
  }
}