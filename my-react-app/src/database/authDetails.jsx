import {onAuthStateChanged, signOut, getAuth} from "firebase/auth"; 
import React, {useEffect, useState} from "react"; 
import {firebaseApp as app} from "./firebase.jsx"; 

const auth = getAuth(app); 

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null); 

    useEffect(() => {
        const user = auth.currentUser; 
        if (user) {
            setAuthUser(user); 
        } else {
            setAuthUser(null); 
        }
    }, []); 

    const usersignOut = () => {
        signOut(auth)
        .then(() => {
            console.log("sign out successful")
        })
        .catch(error => console.log(error)); 
    }
    return (
        <div>
            {authUser ? 
            <>
            <p>{`Signed In as ${authUser.email}`}</p>
            <button onClick={usersignOut}>Sign Out</button>
            </> : 
            <p>Signed Out</p>}
        </div>
    ); 
}; 

export default AuthDetails; 