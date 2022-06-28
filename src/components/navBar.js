import styled from 'styled-components'
import React, { useState } from 'react'; 
import { RenderSignOutButton } from './signOut.js'; 
import { RenderGoogleButton } from './GoogleAuth.js';
import { getAuth } from 'firebase/auth';

const auth = getAuth(); 

const NavBar = props => {
    const { userName } = props; 
    const isUserSignedIn = () => {
        return !!getAuth().currentUser; 
    }

    return (
        <BarCont id="BarCont">

            <CharaCont>Find these characters</CharaCont> 

            {isUserSignedIn() ?
                <SignedInCont>
                    <TextBlock>{userName}</TextBlock>
                    <RenderSignOutButton />
                </SignedInCont>
                :
                <RenderGoogleButton />
                }

        </BarCont> 
        )

}

export default NavBar; 

const BarCont = styled.div`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  padding: 0 1rem;
  min-height: 60px;
`

const CharaCont = styled.div`
    margin-top: auto;
    margin-bottom: auto;
`

const Menu = styled.ul``

const SignedInCont = styled.div`
    display: flex; 
`

const TextBlock = styled.div`
color: #ffffff; 
white-space: nowrap;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    margin-right: 10px;
`