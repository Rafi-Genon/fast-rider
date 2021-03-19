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
                var user = result.user;
                console.log(user);
                setLoggedInUser(user)
            }).catch((error) => {
            });
    }
    return (
        <div>
            <button onClick={handleGoogelSignIn}>g log in</button>
        </div>
    );
};

export default Login;