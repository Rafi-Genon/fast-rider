import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { fullContext } from '../../App'
const Login = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedUser, setloggedUser] = useContext(fullContext)
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
                setloggedUser(googleSignIn)
                history.replace(from);
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
        <div>
            <button onClick={handleGoogelSignIn}>Google Sign in</button>
            <h2 style={{ color: 'red' }}>email pass log in</h2>
            <form onSubmit={handleSubmit} >
                <input type="text" onBlur={handleBlur} name="email" placeholder="your email" required />
                <br />
                <input type="password" onBlur={handleBlur} placeholder="your password" name="password" required />
                <br />
                {
                    <p>{loggedUser.error}</p>
                }
                {
                    loggedUser.success && <p>Log in successful</p>
                }
                <input type="submit" value="Sign in" />
            </form>
            <p>Don't have account go to <Link to="/create-account">Create account</Link> </p>
        </div>
    );
};

export default Login;