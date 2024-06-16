import axios from 'axios';
import React, { useState } from 'react';
import Overlay from '../../UI/Overlay';
import Card from '../../UI/Card';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const formSubmitHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const res = await axios.post('http://localhost:5000/auth/login',{
                email:email,
                password:password
            });
            const jwt_token=res.data.auth_token;
            props.onLogin(jwt_token);
            navigate('/');
            return;
        }
        catch(err){
            console.log(err);
        }
        setLoading(false);
        setEmail('');
        setPassword('');
        alert("Invalid Username or Password");
    }

    return ( 
        <>
        {loading&&<Overlay/>}
        <Card>
            <form onSubmit={formSubmitHandler}>
                <h2>Login Form</h2>

                <label>Email</label>
                <input 
                type='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>

                <label>Password</label>
                <input 
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>

                <button type='submit'>Log Up</button>
            </form>
        </Card>
        </>
     );
}

export default Login;