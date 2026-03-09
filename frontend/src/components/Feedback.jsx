import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
function Feedback(props) {
    const {docId}=props;
    // console.log(userId);
    const [data, setData] = useState(null);
    async function fetchFeedback() {
        try {
            let res=await axios.get(`http://localhost:8080/questions-api/get-feedback/${docId}`, { withCredentials: true });
            // console.log('Feedback response:', res.data);
            setData(res.data.feedback);
        } 
        catch (err) {                                       
            console.log('Error fetching feedback:', err.message);
            return null;
        }
    }
    if (!data) return <p>No feedback available</p>;
    return (
        <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
        <h2>Quiz Feedback</h2>

        {/* Overall Feedback */}
        <div>
            <h3>Overall Feedback</h3>
            <p>{data.overallFeedback}</p>
        </div>

        {/* Strengths */}
        <div>
            <h3>Strengths</h3>
            <ul>
            {data.strengths?.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        </div>

        {/* Weak Areas */}
        <div>
            <h3>Weak Areas</h3>
            <ul>
            {data.weakAreas?.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        </div>

        {/* Suggestions */}
        <div>
            <h3>Suggestions</h3>
            <ul>
            {data.suggestions?.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        </div>
        </div>
    );
}

export default Feedback;