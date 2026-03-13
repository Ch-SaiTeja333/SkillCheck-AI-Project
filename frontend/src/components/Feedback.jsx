import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
function Feedback({ docId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFeedbackBtn, setIsFeedbackBtn] = useState(true);

  async function fetchFeedback() {
    //! feedback update in database
    try {
      let res = await axios.put(
        "http://localhost:8080/questions-api/feedback",
        { id: docId },
        { withCredentials: true },
      );
      console.log("Feedback updated successfully", res.data);
      // setIsFeedbackVisible(true);
      if (res.data.payload) {
        setData(res.data.payload);
        // setLoading(false);

      }
    } catch (err) {
      console.log("err in feedback updation .... [frontend]", err.message);
    }
  }
  useEffect(() => {
    if (data) return;
    const interval = setInterval(fetchFeedback, 2000);
    return () => clearInterval(interval);
  }, [docId, data]);
  // if (loading) return <p>Generating feedback...</p>;
  // if (!data) return <p>No feedback available</p>;
  // console.log("rjghgrjtgnrgjrngjrw", data);

  if (isFeedbackBtn)
    return (
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsFeedbackBtn(false);
        }}
      >
        Get Feedback
      </button>
    );

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4">Quiz Feedback</h2>

      {/* Overall Feedback */}
      <div className="card mb-3">
        <div className="card-header bg-primary text-white">
          Overall Feedback
        </div>
        <div className="card-body">
         <p className="card-text">
          {data?.overallFeedback || "No overall feedback available for this quiz."}
        </p>
        </div>
      </div>

      {/* Strengths */}
      <div className="card mb-3">
        <div className="card-header bg-success text-white">Strengths</div>
        <div className="card-body">
         <ul>
          {data?.strengths?.length > 0 ? (
            data.strengths.map((item, i) => <li key={i}>{item}</li>)
          ) : (
            <li>No specific strengths identified for this attempt.</li>
          )}
        </ul>
        </div>
      </div>

      {/* Weak Areas */}
      <div className="card mb-3">
        <div className="card-header bg-danger text-white">Weak Areas</div>
        <div className="card-body">
         <ul>
          {data?.weakAreas?.length > 0 ? (
            data.weakAreas.map((item, i) => <li key={i}>{item}</li>)
          ) : (
            <li>No weak areas identified. Great job!</li>
          )}
        </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="card mb-3">
        <div className="card-header bg-warning">Suggestions</div>
        <div className="card-body">
          <ul>
            {data?.suggestions?.length > 0 ? (
              data.suggestions.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No suggestions available at the moment.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
