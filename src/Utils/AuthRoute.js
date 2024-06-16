import React from 'react';
import Home from '../Components/Home/Home';

function AuthRoute(props) {
    if(!props.isLoggedIn){
        return (props.children);
    }
    return <Home/>;
}

export default AuthRoute;