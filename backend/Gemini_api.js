import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

// 1. Setup the Client
// Use 'v1' or 'v1beta' based on your regional availability
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
 
});

/**
 * Clean generation function
 */
export const runApi = async (promptText) => {
  try {
    // Note: The model name from your list is 'models/gemini-2.5-flash'
    // You can usually omit the 'models/' prefix.
    const response = await ai.models.generateContent({
      // model: "gemini-flash-latest", 
      // model:"gemini-2.5-pro-preview-tts",
      // model: "gemini-2.5-flash",
      // model: "gemini-2.5-flash-lite",

      
      // models/gemini-2.5-pro
      // models/gemini-2.0-flash
      // models/gemini-2.0-flash-001
      // models/gemini-2.0-flash-exp-image-generation
      // models/gemini-2.0-flash-lite-001
      // models/gemini-2.5-flash-preview-tts
      // models/gemini-2.5-pro-preview-tts
      // models/gemma-3-1b-it
      // models/gemma-3-4b-it
      // models/gemma-3-12b-it
      // models/gemma-3-27b-it
      // models/gemma-3n-e4b-it
      // models/gemma-3n-e2b-it
      // models/gemini-flash-latest
      // models/gemini-flash-lite-latest
      // models/gemini-pro-latest
      // models/gemini-2.5-flash-lite
      // models/gemini-2.5-flash-image
      // models/gemini-2.5-flash-lite-preview-09-2025
      // models/gemini-3-pro-preview
      // models/gemini-3-flash-preview
      // models/gemini-3.1-pro-preview
      // models/gemini-3.1-pro-preview-customtools
      // models/gemini-3.1-flash-lite-preview
      // models/gemini-3-pro-image-preview
      // models/nano-banana-pro-preview
      // models/gemini-3.1-flash-image-preview
      // models/gemini-robotics-er-1.5-preview
      // models/gemini-2.5-computer-use-preview-10-2025
      // models/deep-research-pro-preview-12-2025
      // models/gemini-embedding-001
      // models/aqa
      // models/imagen-4.0-generate-001
      // models/imagen-4.0-ultra-generate-001
      // models/imagen-4.0-fast-generate-001
      // models/veo-2.0-generate-001
      // models/veo-3.0-generate-001
      // models/veo-3.0-fast-generate-001
      // models/veo-3.1-generate-preview
      // models/veo-3.1-fast-generate-preview
      // models/gemini-2.5-flash-native-audio-latest
      // models/gemini-2.5-flash-native-audio-preview-09-2025
      // models/gemini-2.5-flash-native-audio-preview-12-2025
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

//! Get the question generation prompt builder
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


//! Get the feedback prompt builder
export const buildFeedbackPrompt = (obj) => `
A user attempted a quiz.

Quiz Details:
Topic: ${obj.topic}
Difficulty Level: ${obj.difficultyLevel}
Score: ${obj.score}
Percentage: ${obj.percentage}%

Questions and Answers:
${obj.questions.map((q, i) => `
Question ${i + 1}: ${q}
Options: ${obj.options.availableOptions[i].join(", ")}
Correct Answer: ${obj.options.correctOptions[i]}
User Answer: ${obj.options.userOptions[i] || "Not Answered"}
`).join("\n")}

Instructions:
- Analyze the user's performance.
- Identify weak areas.
- Give improvement suggestions.
- Keep feedback concise.
- Do NOT repeat the questions.
- Respond in the following JSON format only.

JSON format:
{
  "overallFeedback": "string",
  "strengths": ["string"],
  "weakAreas": ["string"],
  "suggestions": ["string"]
}
`;


//! Test feedback generation
// const quiz = {
//   topic: "DSA",
//   difficultyLevel: "easy",
//   score: 50,
//   percentage: 50,
//   questions: [
//     "Which data structure stores elements in a linear sequence, where each element can be accessed by index?",
//     "What is an algorithm primarily used for?",
//     "Which of the following data structures operates on the principle of Last In First Out (LIFO)?"
//   ],
//   correctOptions: [
//     "Array",
//     "Solving a computational problem",
//     "Stack"
//   ],
//   userOptions: [
//     "Linked List",
//     "Designing user interfaces",
//     "Queue"
//   ],
//   availableOptions: [
//     ["Linked List", "Tree", "Array", "Graph"],
//     [
//       "Storing data permanently",
//       "Defining a programming language's syntax",
//       "Solving a computational problem",
//       "Designing user interfaces"
//     ],
//     ["Queue", "Stack", "Linked List", "Array"]
//   ]
// };


// const prompt = buildFeedbackPrompt(
//   quiz.topic,
//   quiz.difficultyLevel,
//   quiz.score,
//   quiz.percentage,
//   quiz.questions,
//   quiz.correctOptions,
//   quiz.userOptions,
//   quiz.availableOptions
// );
// const feedback = await runApi(prompt);
// console.log(feedback);


//!frontend 
// record {
//   options: {
//     userOptions: [ 'Structured Query Language', 'GET', 'WHERE' ],
//     correctOptions: [ 'Structured Query Language', 'SELECT', 'WHERE' ],
//     availableOptions: [ [Array], [Array], [Array] ]
//   },
//   _id: new ObjectId('69ac433572cdbb3725a5f2e8'),
//   userId: new ObjectId('69a9a7b55c460e74f6513f98'),
//   topic: 'Sql',
//   difficultyLevel: 'easy',
//   numberQuestions: 3,
//   questions: [
//     'What does SQL stand for?',
//     'Which SQL statement is used to extract data from a database?',
//     'Which SQL clause is used to filter records based on a specified condition?'
//   ],
//   score: 2,
//   percentage: 66.67,
//   feedback: '',
//   __v: 1
// }

//! Test question generation
// const prompt = buildPrompt("DBMS", "MEDIUM", 10);
// const aiResponse = await runApi(prompt);
// console.log(aiResponse);

