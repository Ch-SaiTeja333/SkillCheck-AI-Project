import React from "react";
import { Link } from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
function Home() {
  const {user} = useAuthStore();
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">AI Quiz Generator</h1>
        <p className="text-muted fs-5">
          Practice smarter with AI-generated quizzes and personalized feedback
        </p>
       
      </div>

      {/* Features Section */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold">AI-Generated Questions</h5>
              <p className="card-text text-muted">
                Get dynamic quiz questions based on your selected topic and difficulty level.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Personalized Difficulty</h5>
              <p className="card-text text-muted">
                Choose Easy, Medium, or Hard to match your learning level.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Instant Results & Feedback</h5>
              <p className="card-text text-muted">
                View your score, percentage, correct answers, and areas of improvement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {
        user ? (
          <div className="text-center mt-5">
            <h2 className="fw-bold mb-3">Ready to Test Your Knowledge?</h2>
            <p className="text-muted fs-5 mb-4">
              Click the button below to start your quiz and track your progress!
            </p> 
            <Link to="/quiz">
              <button className="btn btn-success btn-lg">
                Take a Quiz Now
              </button>

            </Link>
          </div>
        ) : ( 
          <div className="text-center mt-5">
            <p className="text-muted">
              Create an account to track your progress and view past quiz history.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-success">
                Register
              </Link>
            </div>
          </div>
        )
    }

    </div>
  );
}

export default Home;


