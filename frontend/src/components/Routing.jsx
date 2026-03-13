import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Quiz from '../pages/Quiz.jsx';
import Home from '../pages/Home.jsx';
import History from '../pages/History.jsx';
import Layout from './Layout.jsx';
import Logout from '../pages/Logout.jsx';
import Contact from '../pages/Contact.jsx'; 
import About from '../pages/About.jsx';
import Profile from '../pages/Profile.jsx';
import AttemptQuiz from '../pages/AttemptQuiz.jsx';
import EntireQuizDetails from './EntireQuizDetails.jsx';
function Routing() {
  const browserRouterObj=createBrowserRouter([{
   path:'/',
   element:<Layout></Layout>,
   children:[
    {
        path:'/',
        element:<Home></Home>,
    },
    {
        path:'login',
        element:<Login></Login> 
    }, 
    { 
        path:'register',
         element:<Register></Register>
    },
    {
        path:'quiz',
        element:<Quiz></Quiz>
    },
    {
        path:'history',
        element:<History></History>
    },
    {
        path:'logout',
        element:<Logout></Logout>
    },
    {
        path:'profile',
        element:<Profile></Profile>
    },
    {
        path:'contact',
        element:<Contact></Contact>
    },
    {
        path:'about',
        element:<About></About>
    },
    {
        path:'attempt-quiz',
        element:<AttemptQuiz></AttemptQuiz>
    },
    {
        path:'entire-quiz-details',
        element:<EntireQuizDetails></EntireQuizDetails>
    }
   ]
  }])
  return (
    <RouterProvider router={browserRouterObj}/>
  )
}

export default Routing;
