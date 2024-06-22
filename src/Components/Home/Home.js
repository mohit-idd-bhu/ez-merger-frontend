import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Document from '../Document/Document';
import { backendUrl } from '../../config';

function Home() {
    const [documentData,setDocumentData] = useState([]);
    const jwt_token = localStorage.getItem('jwt-token');

    const getData = async (token)=>{
        try{
            const response = await axios.get(`${backendUrl}/docs/`,{
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
            window.location.pathname='/login';
        }
    }

    useEffect(()=>{
        getData(jwt_token);
    },[jwt_token]);

    const handleDelete = async (e,document)=>{
        e.preventDefault();
        try{
            await axios.delete(`${backendUrl}/docs/delete/${document.id}`,
                {headers:{Authorization:jwt_token}}
            );
            await getData(jwt_token);
        }
        catch(err){
            console.log(err);
        }
    }

    return ( 
        <>
        <ul className={styles['ul-list']}>
            {documentData.map(document=>
                <li key={document.id} className={styles['list-item']}>
                    <Link to={`edit/${document.id}`} className={styles['list-link']}>
                        <Document document={document} onHandleDelete={handleDelete}/>
                    </Link>
                </li>
            )}
        </ul>
        </>
     );
}

export default Home;