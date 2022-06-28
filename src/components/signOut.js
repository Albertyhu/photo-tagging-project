import { getAuth, signOut } from 'firebase/auth'; 
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from '../firebase-config.js';
import styled from 'styled-components'
import { ButtonCont, GoogleButton } from '../style/styledComponents.js'; 

initializeApp(getFirebaseConfig());

const auth = getAuth(); 

export const SignOut = () => {
    signOut(auth); 
}

export const RenderSignOutButton = () => {
    return (
        <ButtonCont id="SignOut-ButtonCont">
            <Button onClick={SignOut} id = "SignOutButton">Sign Out</Button>
        </ButtonCont>
        )
}

const Button = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
    width: 184px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #EDEDED;
    border-radius: 5px;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
    font-family: Roboto; 
    color: #333333;
    cursor: pointer; 
    text-align: center;
    justify-content: center;

  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
    transform: translate(4px, 4px)
  }
`