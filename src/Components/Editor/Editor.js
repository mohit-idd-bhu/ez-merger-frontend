import React, { useEffect, useRef } from 'react';
import styles from './Editor.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';

function Editor(props) {
    const {id} = useParams();
    const editorRef = useRef(null);
    const inputRef = useRef(null);
    const jwt_token = localStorage.getItem('jwt-token');

    const documentChangeHandler = debounce(()=>{
        try{
            axios.put(`http://localhost:5000/docs/update/${id}`,
                {
                    content:editorRef.current.textContent,
                    title:inputRef.current.value
                },
                {headers:{Authorization:jwt_token}}
            );
        }
        catch(err){
            console.log(err);
            localStorage.removeItem('jwt-token');
        }
    },1000);

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
    },[id,jwt_token]);

    return (
        <div className={styles.editorContainer}>
            <input type="text" placeholder="Document Title" className={styles.titleInput} ref={inputRef} onInput={documentChangeHandler}/>
            <div
                ref={editorRef}
                className={styles.textArea}
                contentEditable
                suppressContentEditableWarning={true}
                data-placeholder="Enter Text here"
                onInput={documentChangeHandler}
            >
            </div>
        </div>
     );
}

export default Editor;