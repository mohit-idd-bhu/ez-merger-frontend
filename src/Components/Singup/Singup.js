import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Overlay from '../../UI/Overlay';
import Card from '../../UI/Card';

function Signup(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formSubmitHandler = async (e)=>{
        setLoading(true);
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/auth/signup',{
                email:email,
                password:password
            });
            navigate('/login');
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
            <form onSubmit={formSubmitHandler}>
                <h2>Signup</h2>

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

                <button type='submit'>Sign Up</button>
            </form>
        </Card>
        </>
     );
}

export default Signup;