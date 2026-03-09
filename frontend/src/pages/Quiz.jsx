import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from '../store/authStore';
import {Link} from 'react-router-dom';
import { useState } from "react";
import AttemptQuiz from "./AttemptQuiz.jsx";
function Quiz() {
  const {user} = useAuthStore();
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitForm(obj) {
    navigate('/attempt-quiz',{state:obj});
    // console.log(obj);
  }

  return (
    <div>
      
      {
        user ? (
        <div>
          <form onSubmit={handleSubmit(submitForm)} className="w-50 mx-auto mt-5 p-3 border border-2 border-dark rounded" >
              <div className="mb-3">
                <label htmlFor="topic" className="form-label">
                  Topic
                </label>
                <input
                  type="text"
                  {...register("topic", { required: true })}
                  id="topic"
                  className="form-control"
                  placeholder="e.g. Data Structures, Algorithms, System Design" 
                />
                {errors.topic && <p className="text-danger">Topic is required</p>}
              </div>
              <div className="mb-3">
              <label htmlFor="difficultyLevel" className="form-label">
                Difficulty Level
              </label>
              <select
                {...register("difficultyLevel", { required: true })}
                id="difficultyLevel"
                className="form-control"
              >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {errors.difficultyLevel && (
                <p className="text-danger">Difficulty Level is required</p>
              )}
              </div>
              <div className="mb-3">
                <label htmlFor="numberOfQuestions" className="form-label">
                  Number Of Questions
                </label>
                <input
                  type="number"
                  {...register("numberOfQuestions", { required: true })}
                  id="numberOfQuestions"
                  className="form-control"
                  defaultValue={3}
                />
                {errors.numberOfQuestions && (
                  <p className="text-danger">Number Of Questions is required</p>
                )}
              </div>
              <div className="text-end">
              <button
                className="bg-success border border-2 border-success rounded"
                type="submit"
              >
                get Questions
              </button>
              </div>
          </form>
      </div>
        ) :(
          <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>        
              <div className="card-body text-center">         
                <h2 className="card-title mb-3 text-primary">
                  Login Required
                </h2>
                <p className="text-muted">
                  You must be logged in to access the quiz section. Logging in allows
                  you to attempt quizzes, track your performance, and improve your
                  skills through personalized assessments.
                </p>
                <div className="alert alert-info text-start mt-4">
                  <h6 className="fw-bold">Why login?</h6>
                  <ul className="mb-0">
                    <li>Attempt multiple quizzes</li>
                    <li>Track your quiz results</li>
                    <li>View your performance analytics</li>
                    <li>Improve your technical knowledge</li>
                    <li>Get personalized quiz recommendations</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <Link to="/login">
                    <button className="btn btn-primary px-4 me-3">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="btn btn-outline-secondary px-4">
                      Create Account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Quiz;
//  <div>
//   {resdata &&
//     resdata.questions.map((item, index) => (
//       <div
//         key={index}
//         className="w-50 mx-auto mt-3 p-3 border border-2 border-dark rounded"
//       >
//         <h5>
//           Q{index + 1}: {item}
//         </h5>
//       </div>
//     ))}

//   {resdata &&
//     resdata.options.correctOptions.map((item, index) => (
//       <div
//         key={index}
//         className="w-50 mx-auto mt-3 p-3 border border-2 border-dark rounded"
//       >
//         <h5>
//           Answer {index + 1}: {item}
//         </h5>
//       </div>
//     ))}
// </div>


