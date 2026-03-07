import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AttemptQuiz() {
  const location = useLocation();
  const data = location.state;
  // console.log("data in attempt",data)
  const [resdata, setResdata] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [docId, setDocId] = useState(null);
  const [error, setError] = useState("");
  async function getQuestions() {
      try {
          let res = await axios.post(
          "http://localhost:8080/questions-api/generate",
          data,
          { withCredentials: true }
          );
        // console.log("res  ...", res.data.payload.docId);
        setDocId(res.data.payload._id);
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
  function displayError() {
    const unanswered = [];
    userAnswers.forEach((ans, index) => {
      if (!ans) {
        unanswered.push(index + 1);
      }
    });
    if (unanswered.length > 0) {
      alert(`Please answer Question ${unanswered.join(", ")}`);
      return true;
    }
    return false;
  }
  async function submitQuiz() {
    if(displayError()) return;
    let score = 0;
    userAnswers.forEach((ans, index) => {
      if (ans === resdata.options.correctOptions[index]) {
        score++;
      }
    });
    alert(`Your Score: ${score}/${resdata.questions.length}`);
    //! score and correct answers update in database
    try {
      // console.log(resdata);
      let res = await axios.put(
        `http://localhost:8080/questions-api/score-answers`,
        { score:score , userOptions: userAnswers , docId:docId},
        { withCredentials: true }
      );
      // console.log("Score updated successfully", res.data);
    } 
    catch (error) {
      console.log('error in Score updation .... [frontend]',error.message);
    }

    //! feedback update in database
    try{
      let res=await axios.put('http://localhost:8080/questions-api/feedback',{id:docId},{withCredentials:true});
      console.log('Feedback updated successfully', res.data);  
    }
    catch(err){
      console.log('err in feedback updation .... [frontend]',err.message);
    }
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
      ))
    }

    <div className="text-center mt-4">
      <button className="btn btn-success" onClick={submitQuiz}>
        Submit Quiz
      </button>
    </div>
    </div>

  );
}



export default AttemptQuiz;
