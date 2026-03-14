import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Lazy, Suspense } from "react";
const Layout = Lazy(() => import("./Layout.jsx"));
const Home = Lazy(() => import("../pages/Home.jsx"));
const Login = Lazy(() => import("../pages/Login.jsx"));
const Register = Lazy(() => import("../pages/Register.jsx"));
const Quiz = Lazy(() => import("../pages/Quiz.jsx"));
const History = Lazy(() => import("../pages/History.jsx"));
const Logout = Lazy(() => import("../pages/Logout.jsx"));
const Profile = Lazy(() => import("../pages/Profile.jsx"));
const Contact = Lazy(() => import("../pages/Contact.jsx"));
const About = Lazy(() => import("../pages/About.jsx"));
const AttemptQuiz = Lazy(() => import("../pages/AttemptQuiz.jsx"));
const EntireQuizDetails = Lazy(() => import("./EntireQuizDetails.jsx"));
function Routing() {
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Layout Loading..........</div>}>
          <Layout></Layout>
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>Home page Loading..........</div>}>
              <Home></Home>
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<div>Login page Loading..........</div>}>
              <Login></Login>
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<div>Register page Loading..........</div>}>
              <Register></Register>
            </Suspense>
          ),
        },
        {
          path: "quiz",
          element: (
            <Suspense fallback={<div>Quiz page Loading..........</div>}>
              <Quiz></Quiz>
            </Suspense>
          ),
        },
        {
          path: "history",
          element: (
            <Suspense fallback={<div>History page Loading..........</div>}>
              <History></History>
            </Suspense>
          ),
        },
        {
          path: "logout",
          element: (
            <Suspense fallback={<div>Logout page Loading..........</div>}>
              <Logout></Logout>
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<div>Profile page Loading..........</div>}>
              <Profile></Profile>
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<div>Contact page Loading..........</div>}>
              <Contact></Contact>
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<div>About page Loading..........</div>}>
              <About></About>
            </Suspense>
          ),
        },
        {
          path: "attempt-quiz",
          element: (
            <Suspense fallback={<div>Attempt Quiz page Loading..........</div>}>
              <AttemptQuiz></AttemptQuiz>
            </Suspense>
          ),
        },
        {
          path: "entire-quiz-details",
          element: (
            <Suspense fallback={<div>Quiz Details page Loading..........</div>}>
              <EntireQuizDetails></EntireQuizDetails>
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={browserRouterObj} />;
}

export default Routing;
