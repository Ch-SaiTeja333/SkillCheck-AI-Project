import React from "react";

function About() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">About AI Quiz Generator</h1>
        <p className="text-muted">
          Learn, practice, and evaluate your knowledge with AI-powered quizzes.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Project Overview</h5>
              <p className="card-text text-muted">
                The AI Quiz Generator is a web application designed to help users
                test and improve their knowledge through dynamically generated
                quizzes. Users can select a topic, choose the difficulty level,
                and specify the number of questions they want to attempt.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title fw-semibold">How It Works</h5>
              <p className="card-text text-muted">
                The system uses AI to generate multiple-choice questions based on
                the user's selected topic and difficulty level. After completing
                the quiz, the application evaluates the answers, calculates the
                score and percentage, and provides feedback to help users identify
                areas where they need improvement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Key Features</h5>
              <ul className="text-muted">
                <li>AI-generated quiz questions</li>
                <li>Custom topic and difficulty selection</li>
                <li>Instant score and percentage calculation</li>
                <li>Feedback to identify weak areas</li>
                <li>Simple and user-friendly interface</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;