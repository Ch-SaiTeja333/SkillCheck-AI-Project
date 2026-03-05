//! mini-express
import express from 'express';
import {Router} from 'express';
export const questionsRoutes=Router();
import {buildPrompt, runApi} from '../Gemini_api.js';
import {questionsModel} from '../models/questions-model.js';

questionsRoutes.post('/generate',async(req,res)=>{
    try {
        let {topic,difficultyLevel,numberOfQuestions}=req.body;
        let prompt=buildPrompt(topic,difficultyLevel,numberOfQuestions);
        let aiResponse=await runApi(prompt);
        const parsed = JSON.parse(aiResponse);
        // Save to database
        const questionsData = {
            topic:topic,
            difficultyLevel:difficultyLevel,
            numberQuestions:numberOfQuestions,
            questions: parsed.map(item => item.question),
            options: {
                userOptions: [],
                correctOptions: parsed.map(item => item.correctAnswer)
            },
            score: 0,
            percentage: 0,
            feedback: ''
        }
        const newQuestions = new questionsModel(questionsData);
        await newQuestions.save();
        console.log('Questions saved to database successfully');
        res.status(200).json({
            message:'Questions generated successfully',
            payload:questionsData
        })
    } catch (err) {
        console.log('err in Generating questions--questions-api Backend...',err.message);
        res.status(500).json({ message: err.message });
    }
})


// {
//     "message": "Questions generated successfully",
//     "payload": [
//         {
//             "question": "What does DBMS stand for?",
//             "options": [
//                 "Data Backup Management System",
//                 "Database Management Software",
//                 "Database Management System",
//                 "Digital Basic Management System"
//             ],
//             "correctAnswer": "Database Management System"
//         }
//     ]
// }