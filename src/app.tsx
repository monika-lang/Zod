import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

import HomePage from "./pages/home.js";
import ProfilePage from "./pages/profile.js";
import RootLayout from "./root_layout.js";
import React from "react";
import EmailAndPasswordPage from "./pages/emailAndPassword.js";
import FormErrors from "./pages/formErrors.js";
import ProgrammerProfile from "./pages/programmerProfile.js";
import AgeSubmitter from "./pages/AgeChecker.js";
import AutoClearerPage from "./pages/AutoClearer.js";
import RatingFormPage from "./pages/ratingForm.js";


const NotFoundPage = ()=><div>
    <h1 className="text-7xl text-red-950 uppercase font-bold">404 Not Found. </h1>
    <Link to='/'>Go gome</Link>
</div>

const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout/>,
        children:[
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'profile/:id',
                element: <ProfilePage/>
            },
            {
                path: 'profile',
                element: <ProfilePage/>
            },
            {
                path: 'email-password',
                element: <EmailAndPasswordPage/>
            },
            {
                path: "form-errors",
                element: <FormErrors/>
            },
            {
                path: "programmer-profile",
                element: <ProgrammerProfile/>
            },
            {
                path: "age-checker",
                element: <AgeSubmitter/>
            },
            {
                path: "auto-clearer",
                element: <AutoClearerPage/>
            },
            {
                path: "rating-form",
                element: <RatingFormPage/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage/>
    }
])

const App:React.FC = ()=>{
    return <RouterProvider router={router}/>
}
export default App;