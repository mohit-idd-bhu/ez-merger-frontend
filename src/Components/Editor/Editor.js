import React, { useEffect, useRef } from 'react';
import styles from './Editor.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000/',{
    autoConnect:false
});

function Editor(props) {
    const {id} = useParams();
    const editorRef = useRef(null);
    const inputRef = useRef(null);
    const jwt_token = localStorage.getItem('jwt-token');

    const documentChangeHandler = ()=>{
        try{
            const content = editorRef.current.textContent;
            const title = inputRef.current.value;
            socket.emit('update',{id,title,content});
            axios.put(`http://localhost:5000/docs/update/${id}`,
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
        }
    }

    const documentChangeHandlerDebounce = debounce(documentChangeHandler,1000);

    const getData = async (docID,token)=>{
        try{
            const response = await axios.get(`http://localhost:5000/docs/${docID}`,{
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
        }
    }
    useEffect(()=>{
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
    },[id,jwt_token]);

    return (
        <div className={styles.editorContainer}>
            <input 
                type="text" 
                placeholder="Document Title" 
                className={styles.titleInput} 
                ref={inputRef} 
                onInput={documentChangeHandlerDebounce}
            />
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