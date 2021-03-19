import React, { useContext } from 'react';
import { fullContext } from '../../App'

const Home = () => {
    const [newAccount, setNewAccount] = useContext(fullContext)
    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'red' }}>I am the best developer. I do everythig however it difficult</h1>
            <p>name: {newAccount.name}</p>
            <p>email: {newAccount.email}</p>
            <p>password: {newAccount.password}</p>
            <p>confirm-password: {newAccount.confirmPassword}</p>
            <img src={newAccount.photo} alt="" />
        </div>
    );
};

export default Home;