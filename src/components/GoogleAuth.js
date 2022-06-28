import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import styled from 'styled-components'
import { FcGoogle } from 'react-icons/fc';
import { getFirebaseConfig } from '../firebase-config.js';
import { ButtonCont, GoogleButton } from '../style/styledComponents.js'; 

const fireConfig = initializeApp(getFirebaseConfig())
const auth = getAuth() 

export const SignInWGoogle = () => {
    var provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .catch(e => console.log("Google Sign In Error: " + e.message))
}

export const RenderGoogleButton = () => {
    return (
        <ButtonCont id = "Sigin-ButtonCont">
            <GoogleButton onClick={SignInWGoogle}><FcGoogle style={IconStyle} />Sign In With Your Google Account</GoogleButton>
        </ButtonCont>

        )
}

const IconStyle = {
    height: "25px", 
    width: "25px",
    margin: "auto",
    padding: "5px",
}
