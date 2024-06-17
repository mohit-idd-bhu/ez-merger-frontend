import React from 'react';
import Login from '../Components/Login/Login'


function ProtectedRoute(props) {
    if(props.isLoggedIn){
        return props.children;
    }
    return <Login onLogin={props.onLogin}/>
}

export default ProtectedRoute;