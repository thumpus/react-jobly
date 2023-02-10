import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import CompaniesList from "./CompaniesList";
import Company from "./Company";
import Homepage from "./Homepage";
import JobsList from "./JobsList";
import Profile from "./Profile";
import SignupForm from "./auth/SignupForm";
import LoginForm from "./auth/LoginForm";
import UserContext from "./auth/UserContext";


function Router({ login, signup, applyToJob, hasAppliedToJob }) {

    const { currentUser } = useContext(UserContext);

    function loggedInRoutes() {
        return (
        <Routes>

        <Route exact path="/" element={<Homepage/>} />

        <Route exact path="/companies" element={<CompaniesList/>} />
                
        <Route exact path="/companies/:handle" element={<Company applyToJob={applyToJob} hasAppliedToJob={hasAppliedToJob} />}/>

        <Route exact path="/jobs" element={<JobsList applyToJob={applyToJob} hasAppliedToJob={hasAppliedToJob}/>} />

        <Route exact path="/profile" element={<Profile/>} />

        <Route path="*" element={<Homepage/>} />
        </Routes>
        )
    }

    function loggedOutRoutes() {
        return (
            <Routes>

            <Route exact path="/" element={<Homepage/>} />
    
            <Route exact path="/login" element={<LoginForm login={login} />}/>
                 
            <Route exact path="/signup" element={<SignupForm signup={signup} />}/>
        
            <Route path="*" element={<Homepage/>} />
            </Routes>
            )
    }

    return ( 
        <div>
            {currentUser ? loggedInRoutes() : loggedOutRoutes() }
        </div>
    )
}

export default Router;