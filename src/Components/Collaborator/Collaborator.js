import React from 'react';
import Button from '../../UI/Button/Button'
import styles from './Collaborator.module.css';

function Collaborator(props) {
    return ( 
        <form className={styles['collaborator-form']}>
            <input type='email' className={styles['input']}/>
            <Button className={styles['collaborator-button']}>Add Collaborator</Button>
        </form>
     );
}

export default Collaborator;