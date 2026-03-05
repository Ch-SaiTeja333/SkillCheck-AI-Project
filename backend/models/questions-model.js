//! generate a SCHEMA
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    //Topic
    topic:{
        type:String,
        required:true
    },
    //Difficulty level
    difficultyLevel:{
        type:String,
        required:true
    },
    //Number Questions
    numberQuestions:{
        type:Number,
        required:true
    },
    //Questions array AI prompt
    questions:[],
    // options
    options:{
        // 1 user selected[]
        userOptions:[],
        // 2 AI prompt[]
        correctOptions:[]
    },
    
    //score
    score:{
        type:Number,
        default:0
    },
    //percentage
    percentage:{
        type:Number,
        default:0
    },
    //feedback
    feedback:{
        type:String
    }
})

//! Generate a collection for that SCHEMA
export const questionsModel =  mongoose.model('question',questionSchema);