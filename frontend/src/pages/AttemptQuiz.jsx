import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AttemptQuiz() {
  const location = useLocation();
  const data = location.state;

  const [resdata, setResdata] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  async function getQuestions() {
      try {
      let res = await axios.post(
      "http://localhost:8080/questions-api/generate",
      data,
      { withCredentials: true }
      );
    setResdata(res.data.payload);
    // initialize user answers
    setUserAnswers(
      Array(res.data.payload.questions.length).fill("")
    );
    } catch (err) {
      console.log(err.message, "err in Quiz generated form [FRONTEND]...");
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  function handleChange(index, value) {
    let updated = [...userAnswers];
    updated[index] = value;
    setUserAnswers(updated);
  }

  function submitQuiz() {
  let score = 0;

  userAnswers.forEach((ans, index) => {
    if (ans === resdata.options.correctOptions[index]) {
      score++;
    }
  });

  alert(`Your Score: ${score}/${resdata.questions.length}`);

  }

  if (!resdata) {
      return <h3 className="text-center mt-5">Generating Questions...</h3>;
  }

  return ( 
    <div className="w-50 mx-auto mt-5">
      <h2 className="text-center mb-4">Attempt Quiz</h2>
      <div className='d-flex justify-content-evenly'>
        <p><b>Topic:</b> {data.topic}</p>
        <p><b>Difficulty:</b> {data.difficultyLevel}</p>
        <p><b>No of Questions:</b> {data.numberOfQuestions}</p>
      </div>

    {
    resdata.questions.map((q, index) => (
      <div key={index} className="border p-3 mt-3 rounded">
        <h5>Q{index + 1}: {q}</h5>
        <select
          className="form-control mt-2"
          value={userAnswers[index]}
          onChange={(e) => handleChange(index, e.target.value)}
        >
        <option value="">Select Answer</option>
          {resdata.options.availableOptions[index].map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    ))}

    <div className="text-center mt-4">
      <button className="btn btn-success" onClick={submitQuiz}>
        Submit Quiz
      </button>
    </div>
    </div>

  );
}

export default AttemptQuiz;
