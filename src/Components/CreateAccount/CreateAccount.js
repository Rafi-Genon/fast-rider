import React, { useState } from 'react';
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import Navbar from '../NavBar/Navbar';
import './CreateAccount.css'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fullContext } from '../../App'
const CreateAccount = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const [newAccount, setNewAccount] = useState({
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false,
        worngPassError: false
    })
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogelSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;

                const googleSignIn = { ...newAccount }
                googleSignIn.name = displayName;
                googleSignIn.email = email;
                googleSignIn.photo = photoURL;
                googleSignIn.success = true
                console.log(result.user);

                setNewAccount(googleSignIn)
            }).catch((error) => {
            });
    }

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
            const newUserInfo = { ...newAccount }
            newUserInfo[e.target.name] = e.target.value
            setNewAccount(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newAccount.confirmPassword !== newAccount.password) {
            const newUserInfo = { ...newAccount }
            newUserInfo.worngPassError = true;
            setNewAccount(newUserInfo)
        }
        if (newAccount.name && newAccount.password && newAccount.email && newAccount.confirmPassword === newAccount.password) {
            firebase.auth().createUserWithEmailAndPassword(newAccount.email, newAccount.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    const newUserInfo = { ...newAccount }
                    newUserInfo.error = ''
                    newUserInfo.success = true;
                    newUserInfo.worngPassError = false;
                    setNewAccount(newUserInfo)
                    updateUserName(newAccount.name)
                    console.log(user);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    const newUserInfo = { ...newAccount }
                    newUserInfo.error = errorMessage
                    newUserInfo.success = false;
                    setNewAccount(newUserInfo)
                    console.log(errorMessage);
                });
        }
        e.preventDefault();
    }
    const updateUserName = (name) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
    console.log(newAccount);
    return (
        <div className="container">
            <Navbar></Navbar>
            <div className="form-design my-5">
                <h4 style={{ marginBottom: '40px' }}>Create an account</h4>
                <form onSubmit={handleSubmit} >
                    <input className="form-control" type="text" onBlur={handleBlur} name="name" placeholder='Your name' required />
                    <br />
                    <input className="form-control" type="text" onBlur={handleBlur} name="email" placeholder="your email" required />
                    <br />
                    <input className="form-control" type="password" onBlur={handleBlur} placeholder="your password" name="password" required />
                    <br />
                    <input className="form-control" type="password" onBlur={handleBlur} placeholder="your confirm password" name="confirmPassword" required />
                    <br />
                    {
                        newAccount.worngPassError && <p style={{ color: 'red', textAlign: 'center' }}>Password not match</p>
                    }
                    {
                        <p style={{ color: 'red', textAlign: 'center' }}>{newAccount.error}</p>
                    }
                    {
                        newAccount.success && <p style={{ color: 'green', textAlign: 'center' }}>Account created successfully go to log in page</p>
                    }
                    <input className="btn btn-warning" style={{ width: '100%', fontWeight: '600' }} type="submit" value="SignUp" />
                    <p className="text-center pt-4">Already have an account? <Link to="/log-in">Log in</Link> </p>
                </form>
            </div>
            <div className="mb-5" style={{ width: '25%', margin: 'auto', marginTop: '2em' }}>
                <p style={{ textAlign: 'center', width: '100%', margin: 'auto', border: 'blue 1px solid', fontWeight: '600' }} className="btn" onClick={handleGoogelSignIn}><span style={{ paddingRight: '50px' }}><FontAwesomeIcon icon={faGoogle} /></span> Continue with Google</p>
            </div>
        </div>
    );
};

export default CreateAccount;