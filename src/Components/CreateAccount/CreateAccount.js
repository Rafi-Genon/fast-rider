import React, { useState } from 'react';
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
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
                const googleSignIn = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true
                }
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
        <div>
            <button onClick={handleGoogelSignIn}>g log in</button>
            <h2>email pass create account</h2>
            <form onSubmit={handleSubmit} >
                <input type="text" onBlur={handleBlur} name="name" placeholder='Your name' required />
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="your email" required />
                <br />
                <input type="password" onBlur={handleBlur} placeholder="your password" name="password" required />
                <br />
                <input type="password" onBlur={handleBlur} placeholder="your confirm password" name="confirmPassword" required />
                <br />
                {
                    newAccount.worngPassError && <p>pass not match</p>
                }
                {
                    <p>{newAccount.error}</p>
                }
                {
                    newAccount.success && <p>Account created successfully go to log in page</p>
                }
                <input type="submit" value="Sign up" />
            </form>
            <p>alredy have account go to <Link to="/log-in">Log in</Link> </p>
        </div>
    );
};

export default CreateAccount;