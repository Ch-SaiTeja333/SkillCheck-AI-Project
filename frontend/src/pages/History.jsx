import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function History() {
  const { user } = useAuthStore();
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  async function getHistory() {
    try {
      let res = await axios.get(
        `http://localhost:8080/history-api/user-history/${user.id}`,
        { withCredentials: true }
      );
      // console.log(res.data.payload);
      setHistory(res.data.payload);
    } catch (err) {
      console.log("err in history page...[frontend]", err.message);
    }
  }

  useEffect(() => {
    if (user?.id) getHistory();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quiz History</h2>
      <div className="row">
        {history.map((quiz) => (
          <div className="col-md-4 mb-4" key={quiz._id}>
            <div className="card shadow-sm h-100">

              <div className="card-body">
                <h5 className="card-title">{quiz.topic}</h5>

                <p className="card-text">
                  <strong>Difficulty:</strong> {quiz.difficultyLevel}
                </p>

                <p className="card-text">
                  <strong>Questions:</strong> {quiz.numberQuestions}
                </p>

                <p className="card-text">
                  <strong>Score:</strong> {quiz.score}
                </p>

                <p className="card-text">
                  <strong>Percentage:</strong> {quiz.percentage}%
                </p>

                <p className="card-text text-muted">
                 {/* <strong>Date:</strong>{quiz.createdAt.slice(0,11)} */}
                  <strong>Date:</strong> {quiz.createdAt ? quiz.createdAt.split("T")[0] : "N/A"}
                </p>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => {navigate(`/entire-quiz-details`,{state:{historyId:quiz._id,userId:user.id}})}}
                >
                  View Details
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;