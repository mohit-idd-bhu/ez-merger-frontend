import React from 'react';
import styles from './Document.module.css';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';

function Document({document, onHandleDelete}) {
    return ( 
        <Card className={styles['documents']}>
            <h2 className={styles['title']}>{document.title}</h2>
            <h5 className={styles['owner']}><strong>Owner : {document.owner}</strong></h5>
            <p className={styles['content']}>{document.content.substring(0,50)}...<b>Read More</b></p>
            <Button 
            className={styles['delete-button']} 
            onClick={(e)=> onHandleDelete(e,document)}>
                Delete</Button>
        </Card>
     );
}

export default Document;