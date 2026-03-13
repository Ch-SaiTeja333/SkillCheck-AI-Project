import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';
import axios from 'axios';
function EntireQuizDetails() {
    const location = useLocation();
    const {historyId,userId} = location.state;
    const [quizDetails,setQuizDetails] = useState(null);
    // console.log("history id in entire quiz details page : ", historyId);
    // console.log("user id in entire quiz details page : ", userId);
    async function getEntireQuizDetails() {
        try {
            let res=await axios.get(`http://localhost:8080/history-api/user-history/${userId}/${historyId}`,{withCredentials:true});
            // console.log("entire quiz details : ",res.data.payload);
            setQuizDetails(res.data.payload);
        } catch (err) {
            console.log("error in EntireQuizDetails...component [frontend]",err.message);
        }
    }
    useEffect(()=>{
        getEntireQuizDetails();
    },[])
   if (!quizDetails) return <h3 className="text-center mt-5">Loading...</h3>;

  const feedback = JSON.parse(quizDetails.feedback);

  return (
    <div className="container mt-4">

      <h2 className="mb-3">{quizDetails.topic} Quiz Details</h2>

      <div className="card p-3 mb-4">

        <p><strong>Difficulty:</strong> {quizDetails.difficultyLevel}</p>
        <p><strong>Questions:</strong> {quizDetails.numberQuestions}</p>
        <p><strong>Score:</strong> {quizDetails.score}</p>
        <p><strong>Percentage:</strong> {quizDetails.percentage}%</p>
        <p><strong>Date:</strong> {quizDetails.createdAt.split("T")[0]}</p>

      </div>

      <h4>Questions</h4>

      {quizDetails.questions.map((q, index) => (
        <div key={index} className="card p-3 mb-3">

          <h6>Q{index + 1}. {q}</h6>

          <p>
            <strong>Your Answer:</strong>{" "}
            {quizDetails.options.userOptions[index]}
          </p>

          <p>
            <strong>Correct Answer:</strong>{" "}
            {quizDetails.options.correctOptions[index]}
          </p>

        </div>
      ))}

      <h4 className="mt-4">Feedback</h4>

      <div className="card p-3">

        <p><strong>Overall:</strong> {feedback.overallFeedback}</p>

        <p><strong>Strengths:</strong></p>
        <ul>
          {feedback.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <p><strong>Weak Areas:</strong></p>
        <ul>
          {feedback.weakAreas.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>

        <p><strong>Suggestions:</strong></p>
        <ul>
          {feedback.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default EntireQuizDetails
