import React, { useContext } from 'react';
import { fullContext } from '../../App';

import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    const [newAccount, setNewAccount] = useContext(fullContext)
    return (
        <div>
            <div className="container p-4">
                <div></div>
                <div className="nav-item d-flex justify-content-end ">
                    <Link to="/home"><p>Home</p></Link>
                    <p>Destination</p>
                    <p>Blog</p>
                    <p>Contact</p>
                    {
                        newAccount.email ? <p style={{color:'red', fontWeight:'700'}}>{newAccount.name}</p>
                            : <Link to="/log-in"><button className="btn btn-warning">Log in</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;