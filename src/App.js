import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Singup/Singup";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { useEffect, useState } from "react";
import AuthRoute from "./Utils/AuthRoute";

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

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} onLogin={loginHandler}><Home/></ProtectedRoute>
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
