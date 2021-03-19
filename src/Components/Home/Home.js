import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { fullContext } from '../../App'

const Home = () => {
    const [newAccount, setNewAccount] = useContext(fullContext)
    return (
        <div style={{ textAlign: 'center' }}>
            <p><Link to="/book">Book car</Link></p>
            <h1 style={{ color: 'red' }}>I am the best developer. I do everythig however it difficult</h1>
            <p>name: {newAccount.name}</p>
            <p>email: {newAccount.email}</p>
            <p>password: {newAccount.password}</p>
            <p>confirm-password: {newAccount.confirmPassword}</p>
            <img src={newAccount.photo} alt="" />
            <p>alredy have account go to <Link to="/log-in">Log in</Link> </p>
            <p>Don't have account go to <Link to="/create-account">Create account</Link> </p>
        </div>
    );
};

export default Home;