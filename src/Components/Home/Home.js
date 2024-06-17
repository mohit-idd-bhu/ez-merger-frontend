import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../../UI/Card';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../UI/Button/Button'
import styles from './Home.module.css';

function Home() {
    const [documentData,setDocumentData] = useState([]);
    const jwt_token = localStorage.getItem('jwt-token');
    const navigate = useNavigate();

    const getData = async (token)=>{
        try{
            const response = await axios.get('http://localhost:5000/docs/',{
                headers:{
                    Authorization:token
                }
            });
            const newDocumentData = response.data.documents;
            setDocumentData(newDocumentData);
            return;
        }
        catch(err){
            console.log(err);
            localStorage.removeItem('jwt-token');
        }
    }

    useEffect(()=>{
        getData(jwt_token);
    },[jwt_token]);

    const handleDelete = async (e,document)=>{
        e.preventDefault();
        try{
            await axios.delete(`http://localhost:5000/docs/delete/${document.id}`,
                {headers:{Authorization:jwt_token}}
            );
            await getData(jwt_token);
        }
        catch(err){
            console.log(err);
            localStorage.removeItem('jwt-token');
            navigate('/login');
        }
    }

    return ( 
        <>
        <ul className={styles['ul-list']}>
            {documentData.map(document=>
                <li key={document.id} className={styles['list-item']}>
                    <Link to={`edit/${document.id}`} className={styles['list-link']}>
                    <Card className={styles['documents']}>
                        <h2>{document.title}</h2>
                        <h5>Owner : {document.owner}</h5>
                        <p>{document.content.substring(0,50)}...<b>Read More</b></p>
                        <Button 
                        className={styles['delete-button']} 
                        onClick={(e)=> handleDelete(e,document)}>
                            Delete</Button>
                    </Card>
                    </Link>
                </li>
            )}
        </ul>
        </>
     );
}

export default Home;