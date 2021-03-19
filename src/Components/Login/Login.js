import React, { useContext, useState } from 'react';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { fullContext } from '../../App'
const Login = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    // ***************************************************
    // ***************************************************
    const [loggedInUser, setLoggedInUser] = useContext(fullContext)
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    // ******************************************************
    // *******************************************************
    const handleGoogelSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const googleSignIn = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                console.log(result.user);
                setLoggedInUser(googleSignIn)
            }).catch((error) => {
            });
    }
    // *******************************************************
    // *******************************************************
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
            setLoggedInUser(newUserInfo);
            // console.log(newUserInfo);
        }
    }

    // ***************************************************************
    const validation = () => {
        if (loggedInUser.confirmPassword !== loggedInUser.password) {
            console.log('mc worg likhsos');
        }
        else {
            console.log('yu wite');
        }
    }
    // ****************************************
    const handleSubmit = (e) => {
        if (loggedInUser.confirmPassword !== loggedInUser.password) {
            console.log('mc worg likhsos');
            // const warning = <p>you are write wrong</p>
        }
        if (loggedInUser.name && loggedInUser.password && loggedInUser.email && loggedInUser.confirmPassword === loggedInUser.password) {
            // console.log('correct info');
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    console.log(user);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    // ..
                });
        }
        // else{
        //     console.log('wrong info');
        // }
        e.preventDefault();

    }

    // const [confirmPassword, setconfirmPassword] = useState('')
    // const [password, setpassword] = useState('')
    return (
        <div>
            <button onClick={handleGoogelSignIn}>g log in</button>
            <h2>email pass log in</h2>
            <form onSubmit={handleSubmit} >
                <input type="text" onBlur={handleBlur} name="name" placeholder='Your name' />
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="your email" required />
                <br />
                <input type="password" onBlur={handleBlur} placeholder="your otp" name="password" required />
                <br />
                <input type="password" onBlur={handleBlur} placeholder="your confirm password" name="confirmPassword" required />
                <br />
                {

                }
                <input type="submit" value="Sign up" />
            </form>
        </div>
    );
};

export default Login;