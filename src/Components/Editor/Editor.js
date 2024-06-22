import React, { useEffect, useRef, useState } from 'react';
import styles from './Editor.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { io } from 'socket.io-client';
import {backendUrl} from '../../config';

const socket = io(backendUrl,{
    autoConnect:false
});

function Editor(props) {
    const {id} = useParams();
    const editorRef = useRef(null);
    const inputRef = useRef(null);
    const [buttonText,setButtonText] = useState('Copy Link')
    const jwt_token = localStorage.getItem('jwt-token');
    const navigate = useNavigate();

    const handleCopyLink = async (e)=>{
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        setButtonText('Copied!')
        setTimeout(()=>{
            setButtonText('Copy Link')
        },6000);
    }

    const documentChangeHandler = ()=>{
        try{
            const content = editorRef.current.textContent;
            const title = inputRef.current.value;
            socket.emit('update',{id,title,content});
            axios.put(`${backendUrl}/docs/update/${id}`,
                {
                    content:content,
                    title:title
                },
                {headers:{Authorization:jwt_token}}
            );
        }
        catch(err){
            console.log(err);
            localStorage.removeItem('jwt-token');
            navigate('/login');
        }
    }

    const documentChangeHandlerDebounce = debounce(documentChangeHandler,1000);

    useEffect(()=>{
        const getData = async (docID,token)=>{
            try{
                const response = await axios.get(`${backendUrl}/docs/${docID}`,{
                    headers:{
                        Authorization:token
                    }
                });
                const document = response.data.document;
                inputRef.current.value = document.title;
                editorRef.current.textContent = document.content;
            }
            catch(err){
                console.log(err);
                localStorage.removeItem('jwt-token');
                navigate('/login');
            }
        }
        getData(id,jwt_token);
        socket.connect();
        socket.emit('join-document',id);
        socket.on('update',(updateData)=>{
            inputRef.current.value=updateData.title;
            editorRef.current.textContent=updateData.content;
        })
        return ()=>{
            socket.emit('leave-document',id);
            socket.off('update');
        }
    },[id,jwt_token,navigate]);

    return (
        <div className={styles.editorContainer}>
            <div className={styles.titleBar}>
                <input
                    type="text"
                    placeholder="Document Title"
                    className={styles.titleInput}
                    ref={inputRef}
                    onInput={documentChangeHandlerDebounce}
                />
                <button 
                    className={styles.copyLinkButton} 
                    onClick={handleCopyLink}>
                    {buttonText}
                </button>
            </div>
            <div
                ref={editorRef}
                className={styles.textArea}
                contentEditable
                suppressContentEditableWarning={true}
                data-placeholder="Enter Text here"
                onInput={documentChangeHandlerDebounce}
            />
        </div>

     );
}

export default Editor;