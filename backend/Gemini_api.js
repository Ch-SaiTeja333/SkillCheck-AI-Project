import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

// 1. Setup the Client
// Use 'v1' or 'v1beta' based on your regional availability
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: 'v1' 
});

/**
 * Clean generation function
 */
export const runApi = async (promptText) => {
  try {
    // Note: The model name from your list is 'models/gemini-2.5-flash'
    // You can usually omit the 'models/' prefix.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: [{ role: "user", parts: [{ text: promptText }] }]
    });

    return response.text;
  } catch (error) {
    // Detailed error logging for debugging
    console.error("Gemini Error Status:", error.status);
    console.error("Gemini Error Message:", error.message);
    return null;
  }
};

export const buildPrompt = (topic, difficultyLevel, numberOfQuestions) => `
Generate ${numberOfQuestions} multiple-choice questions (MCQs) on the topic "${topic}".
Difficulty level: ${difficultyLevel}.

Strict rules:
- Each question must have exactly 4 options.
- Options must be clear and non-ambiguous.
- Provide the correct answer for each question.
- Do NOT include explanations.
- Do NOT include any extra text.
- Respond ONLY in the following JSON format.

JSON format:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": "string"
  }
]
`;
// const prompt = buildPrompt("DBMS", "MEDIUM", 10);
// const aiResponse = await runApi(prompt);
// console.log(aiResponse);

