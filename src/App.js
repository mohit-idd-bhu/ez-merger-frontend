import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { useEffect, useState } from "react";
import AuthRoute from "./Utils/AuthRoute";
import Navbar from "./Components/Navbar/Navbar";
import Editor from "./Components/Editor/Editor";

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('jwt-token');
    if(token){
      setIsLoggedIn(true);
    }
  },[])

  const loginHandler = (jwt_token)=>{
    setIsLoggedIn(true);
    localStorage.setItem('jwt-token',jwt_token);
  }

  const logoutHandler = ()=>{
    setIsLoggedIn(false);
    localStorage.removeItem('jwt-token');
  }

  return (
    <div className="App">
      <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler}/>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} onLogin={loginHandler}><Home/></ProtectedRoute>
          }/>
          <Route path="/edit/:id" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} onLogin={loginHandler}><Editor/></ProtectedRoute>
          }/>
          <Route path="/signup" element={
            <AuthRoute isLoggedIn={isLoggedIn}><Signup/></AuthRoute>
          }/>
          <Route path="/login" element={
            <AuthRoute isLoggedIn={isLoggedIn}><Login onLogin={loginHandler}/></AuthRoute>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
