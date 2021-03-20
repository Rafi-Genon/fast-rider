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

    const [loggedUser, setloggedUser] = useContext(fullContext)
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogelSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;

                const googleSignIn = { ...loggedUser }
                googleSignIn.name = displayName;
                googleSignIn.email = email;
                googleSignIn.photo = photoURL;
                googleSignIn.success = true

                setloggedUser(googleSignIn)
                history.replace(from);
            }).catch((error) => {
            });
    }
    console.log(loggedUser);
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
            const newUserInfo = { ...loggedUser }
            newUserInfo[e.target.name] = e.target.value
            setloggedUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (loggedUser.password && loggedUser.email) {
            firebase.auth().signInWithEmailAndPassword(loggedUser.email, loggedUser.password)
                .then((userCredential) => {
                    // const user = userCredential.user;
                    const { displayName, email } = userCredential.user;
                    const newUserInfo = { ...loggedUser }
                    newUserInfo.error = ''
                    newUserInfo.success = true;
                    newUserInfo.name = displayName;
                    newUserInfo.email = email
                    setloggedUser(newUserInfo)
                    history.replace(from);
                    // console.log(user);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    const newUserInfo = { ...loggedUser }
                    newUserInfo.error = errorMessage
                    newUserInfo.success = false;
                    setloggedUser(newUserInfo)
                    console.log(errorMessage);
                });
        }
        e.preventDefault();
    }
    console.log(loggedUser);
    return (
        <div className="container">
            <Navbar></Navbar>
            <div className="form-design">
                <h4 style={{ marginBottom: '40px' }}>Login</h4>
                <form onSubmit={handleSubmit} >
                    <input className="form-control" type="text" onBlur={handleBlur} name="email" placeholder="your email" required />
                    <br />
                    <input className="form-control" type="password" onBlur={handleBlur} placeholder="your password" name="password" required />
                    <br />
                    <input type="checkbox" name="remeber-me" id="" />
                    <label style={{ paddingLeft: '20px' }} htmlFor="checkbox">Remeber Me</label>
                    {
                        <p style={{ color: 'red', textAlign: 'center' }}>{loggedUser.error}</p>
                    }
                    {
                        loggedUser.success && <p>Log in successful</p>
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