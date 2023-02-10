import './App.css';
import React, { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./Navbar";
import Router from "./Routes";
import JoblyApi from './api';
import UserContext from './auth/UserContext';
import jwt from "jsonwebtoken";
export const TOKEN_STORAGE_ID = "jobly-token"

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(function loadUserInfo(){

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch(err){
          console.error("Problem loading user", err)
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    getCurrentUser();
  }, [token])
  

  async function signup(signupData) {
  try {
    let token = await JoblyApi.signup(signupData);
    setToken(token);
    JoblyApi.token = token;
    console.log(token);
    return { success: true };
  } catch (errors) {
    console.error("signup failed", errors);
    return { success: false, errors }
  }
  }

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      console.log(token);
      JoblyApi.token = token;
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    console.log(`applying to job id: ${id}`)
    let response = await JoblyApi.applyToJob(currentUser.username, id); 
    setApplicationIds(new Set([...applicationIds, id]));
    console.log(applicationIds)
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function logout() {
    console.log('loggin out')
    setCurrentUser(null);
    setToken(null);
  }

  if (!infoLoaded) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <NavBar logout={logout}/>
        <Router login={login} signup={signup} applyToJob={applyToJob} hasAppliedToJob={hasAppliedToJob} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
