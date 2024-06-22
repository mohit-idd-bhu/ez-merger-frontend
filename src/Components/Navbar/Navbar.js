import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import axios from 'axios';
import Button from '../../UI/Button/Button'
import { backendUrl } from '../../config';

const Navbar = ({isLoggedIn,onLogout}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const createDocument = async () => {
        try{
            const token = localStorage.getItem('jwt-token');
            const response = await axios.post(
                `${backendUrl}/docs/create`,
                {title:`New Document ${new Date().toLocaleString()}`},
                {headers:{Authorization:token}}
            );
            navigate(`edit/${response.data.id}`);
        }
        catch(err){
            console.log(err);
            localStorage.removeItem('jwt-token');
            navigate('/login');
        }
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarBrand}>
            <Link to="/" className={styles.navbarLink}>Ez-Merger</Link>
            </div>
            <div className={styles.navbarLinks}>
            {isLoggedIn?(
                <>
                <Button onClick={createDocument}>Create</Button>
                <button onClick={handleLogout} className={styles.navbarButton}>Logout</button>
                </>
            ):(
                <>
                <Link to="/login" className={styles.navbarLink}>Login</Link>
                <Link to="/signup" className={styles.navbarLink}>Signup</Link>
                </>
            )}
            </div>
        </nav>
    );
};

export default Navbar;
