import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Overlay from '../../UI/Overlay';
import Card from '../../UI/Card/Card';
import styles from './Signup.module.css';
import { backendUrl } from '../../config';

function Signup(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formSubmitHandler = async (e)=>{
        e.preventDefault();
        if(email.length===0||password.length===0){
            alert("Email or Password Missing");
            return;
        }
        setLoading(true);
        try{
            await axios.post(`${backendUrl}/auth/signup`,{
                email:email,
                password:password
            });
            navigate('/login');
            return;
        }
        catch(err){
            if(err.response){
                console.log(err.response.data);
            }
            else{
                console.log(err);
            }
        }
        setLoading(false);
        setEmail('');
        setPassword('');
        alert("Email Already Exist");
    }

    return (
        <>
        {loading&&<Overlay/>}
        <Card>
            <form onSubmit={formSubmitHandler} className={styles['form']}>
                <h2 className={styles['heading']}>Signup</h2>

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

                <button type='submit' className={styles['button']}>Sign Up</button>
            </form>
        </Card>
        </>
     );
}

export default Signup;