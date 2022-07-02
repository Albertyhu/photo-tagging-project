import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import styled from 'styled-components'
import { FcGoogle } from 'react-icons/fc';
import { getFirebaseConfig } from '../firebase-config.js';
import { ButtonCont, GoogleButton, Subtitle } from '../style/styledComponents.js'; 

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

export const RenderSignInPanel = () => {
    return (
        <Container>
            <Title>Sign In With Google</Title>
            <Subtitle style={{marginBottom: "10px"}}>This is to help us keep record of your score.</Subtitle>
            <RenderGoogleButton /> 
        </Container> 
        )
}

const IconStyle = {
    height: "25px", 
    width: "25px",
    margin: "auto",
    padding: "5px",
}

const Container = styled.div`
height: fit-content; 
width: fit-content; 
border-radius: 25px; 
box-shadow: 0 0 15px 25px rgba(0,0,0, 0.3); 
margin: auto;
position: absolute;
background-color: #525252;
z-index: 1;
top: 30%; 
left: 0;
right: 0; 
text-align: center; 
padding: 10px;
`

const Title = styled.div`
font-size: 25px; 
font-weight: bold; 
margin-top: 10px;
margin-bottom: 10px;
color: #fff; 
`