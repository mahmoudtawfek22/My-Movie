import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  ai = new GoogleGenAI({ apiKey: environment.GEMINI_API_KEY });
  constructor() {}
  aiSearch(userInput: string): Observable<string> {
    const prompt = `
 The user is asking for movie recommendations.

User Query: "${userInput}"

 Your task:
- Analyze the user's query carefully.
- If the user mentions an actor, director, movie, mood, or genre — focus ONLY on that.
- Stay within the context and description provided by the user.
- Find **as many relevant suggestions as possible**, covering all possible related movies.
- Always provide **at least 5 movie recommendations** that match the user's request closely.
- Make sure all movies are real and well-known (avoid fictional or AI-made names).
- Keep the output focused and relevant — no explanations or text outside JSON.

Respond strictly in this JSON format:
{
  "genres": ["genre1", "genre2"],
  "mood": "string",
  "exampleMovies": ["Movie1", "Movie2", "Movie3", "Movie4", "Movie5", ...]
}
`;
    const promise = this.ai.models
      .generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      })
      .then((res) => {
        const cleanedText = res.text ?? ''; // <- directly access text
        const text = cleanedText
          .replace(/```(?:json)?\s*/, '')
          .replace(/```$/, '');

        try {
          const parsed = JSON.parse(text as any); // parse JSON string
          console.log('parsed', parsed);

          return parsed;
        } catch (error) {
          return { ingredients: [], steps: [] };
        }
      })
      .catch((err) => {
        return { ingredients: [], steps: [] };
      });

    return from(promise);
  }
}
