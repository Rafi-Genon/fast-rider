import React, { useContext } from 'react';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { fullContext } from '../../App'
const Login = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const [loggedInUser, setLoggedInUser] = useContext(fullContext)
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
                }
                console.log(result.user);
                setLoggedInUser(googleSignIn)
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
            const newUserInfo = { ...loggedInUser }
            newUserInfo[e.target.name] = e.target.value
            setLoggedInUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (loggedInUser.confirmPassword !== loggedInUser.password) {
            const newUserInfo = { ...loggedInUser }
            newUserInfo.worngPassError = true;
            setLoggedInUser(newUserInfo)
        }
        if (loggedInUser.name && loggedInUser.password && loggedInUser.email && loggedInUser.confirmPassword === loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    const newUserInfo = { ...loggedInUser }
                    newUserInfo.error = ''
                    newUserInfo.success = true;
                    newUserInfo.worngPassError = false;
                    setLoggedInUser(newUserInfo)
                    console.log(user);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    const newUserInfo = { ...loggedInUser }
                    newUserInfo.error = errorMessage
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo)
                    console.log(errorMessage);
                });
        }
        e.preventDefault();
    }
    console.log(loggedInUser);
    return (
        <div>
            <button onClick={handleGoogelSignIn}>g log in</button>
            <h2>email pass log in</h2>
            <form onSubmit={handleSubmit} >
                <input type="text" onBlur={handleBlur} name="name" placeholder='Your name' required/>
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="your email" required />
                <br />
                <input type="password" onBlur={handleBlur} placeholder="your otp" name="password" required />
                <br />
                <input type="password" onBlur={handleBlur} placeholder="your confirm password" name="confirmPassword" required />
                <br />
                {
                    loggedInUser.worngPassError && <p>pass not match</p>
                }
                {
                    <p>{loggedInUser.error}</p>
                }
                {
                    loggedInUser.success && <p>success fullyt</p>
                }
                <input type="submit" value="Sign up" />
            </form>
        </div>
    );
};

export default Login;