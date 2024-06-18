import axios from 'axios';
import React, { useState } from 'react';
import Overlay from '../../UI/Overlay';
import Card from '../../UI/Card/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const formSubmitHandler = async (e)=>{
        e.preventDefault();
        if(email.length===0||password.length===0){
            alert("Email or Password Missing");
            return;
        }
        setLoading(true);
        try{
            const res = await axios.post('http://localhost:5000/auth/login',{
                email:email,
                password:password
            });
            const jwt_token=res.data.auth_token;
            props.onLogin(jwt_token);
            navigate(location.pathname);
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
            <form onSubmit={formSubmitHandler} className={styles['form']}>
                <h2 className={styles['header']}>Login Form</h2>

                <label className={styles['label']}>Email</label>
                <input 
                className={styles['input']}
                type='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>

                <label className={styles['label']}>Password</label>
                <input 
                className={styles['input']}
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>

                <button type='submit' className={styles['button']}>Log In</button>
            </form>
        </Card>
        </>
     );
}

export default Login;