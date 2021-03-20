import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { fullContext } from '../../App'
import Navbar from '../NavBar/Navbar';
import './Login.css'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Login = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/home" } };

    const [loggedInUser, setLoggedinUser] = useContext(fullContext)
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogelSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;

                const googleSignIn = { ...loggedInUser }
                googleSignIn.name = displayName;
                googleSignIn.email = email;
                googleSignIn.photo = photoURL;
                googleSignIn.success = true

                setLoggedinUser(googleSignIn)
                history.replace(from);
            }).catch((error) => {
            });
    }
    console.log(loggedInUser);
    const handleBlur = (e) => {
        let isFeildValid = true;
        if (e.target.name === 'email') {
            isFeildValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordContainNumber = /\d{1}/.test(e.target.value);
            isFeildValid = isPasswordValid && passwordContainNumber
        }
        if (isFeildValid) {
            const newUserInfo = { ...loggedInUser }
            newUserInfo[e.target.name] = e.target.value
            setLoggedinUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (loggedInUser.password && loggedInUser.email) {
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((userCredential) => {
                    const { displayName, email } = userCredential.user;
                    const newUserInfo = { ...loggedInUser }
                    newUserInfo.error = ''
                    newUserInfo.success = true;
                    newUserInfo.name = displayName;
                    newUserInfo.email = email
                    setLoggedinUser(newUserInfo)
                    history.replace(from);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    const newUserInfo = { ...loggedInUser }
                    newUserInfo.error = errorMessage
                    newUserInfo.success = false;
                    setLoggedinUser(newUserInfo)
                    console.log(errorMessage);
                });
        }
        e.preventDefault();
    }
    console.log(loggedInUser);
    return (
        <div className="container">
            <Navbar></Navbar>
            <div className="form-design">
                <h4 style={{ marginBottom: '40px' }}>Login</h4>
                <form onSubmit={handleSubmit} >
                    <input className="form-control" type="text" onBlur={handleBlur} name="email" placeholder="Your email" required />
                    <br />
                    <input className="form-control" type="password" onBlur={handleBlur} placeholder="Your password" name="password" required />
                    <br />
                    <input type="checkbox" name="remeber-me" id="" />
                    <label style={{ paddingLeft: '20px' }} htmlFor="checkbox">Remeber Me</label>
                    {
                        <p style={{ color: 'red', textAlign: 'center' }}>{loggedInUser.error}</p>
                    }
                    {
                        loggedInUser.success && <p>Log in successful</p>
                    }
                    <input className="btn btn-warning" style={{ width: '100%', fontWeight: '600' }} type="submit" value="Sign in" />
                    <p className="text-center pt-4">Don’t have an account? <Link to="/create-account">Create an account</Link> </p>
                </form>
            </div>
            <div className="mb-5" style={{ width: '25%', margin: 'auto', marginTop: '2em' }}>
                <p style={{ textAlign: 'center', width: '100%', margin: 'auto', border: 'blue 1px solid', fontWeight: '600' }} className="btn" onClick={handleGoogelSignIn}><span style={{ paddingRight: '50px' }}><FontAwesomeIcon icon={faGoogle} /></span> Continue with Google</p>
            </div>


        </div>
    );
};

export default Login;