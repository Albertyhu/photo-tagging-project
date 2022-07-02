import styled, { ThemeProvider } from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'; 
import { RenderSignOutButton } from './signOut.js'; 
import { RenderGoogleButton } from './GoogleAuth.js';
import { getAuth } from 'firebase/auth';
import { imgObj } from '../asset/character_image/charObject.js'; 
import {  Button } from '../style/styledComponents.js';
import { RecordResults } from './recordResults.js';  
import { RenderStopWatch } from './timeComponents.js'; 
import BurgerMenu from '../asset/hamburger_menu_white.png'; 

const auth = getAuth(); 

const NavBar = props => {
    const { userName,
        CatwomanFound,
        VaultBoyFound,
        FaithFound,
        WaldoFound,
        reset,
        runTime,
        StopWatch,
        openMessagePanel,
        setFinalTime, 
        checkIfAllFound,
        getRecord,
        preGame, 
        isTimeRecorded,
        setisTimeRecorded, 
    } = props; 
    const [timer, setTimer] = useState(0)
    const [desktop, setDesktop] = useState(true)
    const [displayMobileMenu, setMobileMenu] = useState(false); 
    const mobileRef = useRef();  
    const burgerRef = useRef(); 
    const isUserSignedIn = () => {
        return !!getAuth().currentUser; 
    }
    var interval = null;
  
    useEffect(() => {
        var finalTime = 0; 
        if (runTime) {
            interval = setInterval(() => {
                setTimer(prevState => prevState + 1)
                finalTime += 1; 
            }, 1000)
            
        }

        //The following code dictates what happens after the user finds all easter eggs 
        //It stops the timer
        //Then record the players name and the time onto Firestore 
        return () => {
            //There is a problem with the timer component being set to 0 when the game ends
            // it seems that clearInterval would reset the value of the timer component to 0
            //So I had to use the variable finalTime to record the player's record 
            //There's also an issue where after saving an edit in any of the files, 
            //the browser rerenders the site and the following block of code gets triggered.
            // thus, you will see final times being recorded as zero
            if (checkIfAllFound() && userName !== '' && !isTimeRecorded) {
                setFinalTime(finalTime)
                console.log("final time: " + finalTime)
                RecordResults(userName, finalTime, getRecord);
                setisTimeRecorded(true); 
                finalTime = 0; 
            }
            clearInterval(interval)
        }
    }, [runTime])

    const toggleMobileMenu = () => {
        if (displayMobileMenu)
            setMobileMenu(false); 
        else
            setMobileMenu(true); 
    }

    const StopGame = () => {
        StopWatch(); 
        clearInterval(interval)
    }

    const closedMenu = {
        leftShift: "-50%",
    }
    const openMenu = {
        leftShift: "0%", 
    }

    const theme = () => {
        return displayMobileMenu ? openMenu : closedMenu
    }


    const ButtonComponent = () => {
        return (
            <ThemeProvider theme={theme()}>
            <MobileMenu ref={mobileRef} id="ButtonComponent">
            {isUserSignedIn() ?
                <>
                    <TextBlock id = "TextMobile">Player: {userName}</TextBlock>
                            <div onClick={() => { setMobileMenu(false) }}><RenderSignOutButton /></div>
                </>
                        :
                <div onClick={() => { setMobileMenu(false) }}>
                    <RenderGoogleButton onClick={() => { setMobileMenu(false) }} />
                </div>
            }

            <Button
                id="NavResetButton"
                        onClick={() => {
                            setMobileMenu(false);
                            setTimer(0);
                            reset(); 
                    }}>Reset Game</Button>
                </MobileMenu >
            </ThemeProvider>
            )
    }

    useEffect(() => {
        if (preGame) {
            setTimer(0)
        }
    }, [preGame])

    const checkIfClickedOutside = e => {
        if (displayMobileMenu
            && mobileRef.current
            && !mobileRef.current.contains(e.target)) {
            setMobileMenu(false);
        }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    const resizeEvent = e => {
        if (window.innerWidth > 768) {
            setDesktop(true); 
            setMobileMenu(false); 
        }
        else {
            setDesktop(false)
        }
    }

    document.addEventListener("resize", resizeEvent);

    useEffect(() => {

        return () => {
            document.removeEventListener("resize", resizeEvent);
            document.removeEventListener("mousedown", checkIfClickedOutside); 
        }
    }, [])

    useEffect(() => {
        resizeEvent();
    }, [window.innerWidth])

    return (
        <BarCont id="BarCont">
            <CharacterField>
            <Block>
                {!desktop &&
                    <MobileBurger
                    src={BurgerMenu}
                    id="Burger Menu"
                    onClick={toggleMobileMenu}
                />
                }
                <Text>Find these characters</Text>
            </Block>
            <CharaCont>
                <ImageCont>
                <Image
                    src={imgObj["Catwoman"]}
                    alt="Catwoman"
                    opacityLevel={CatwomanFound ? 0.3 : 1.0}
                    />
                    <CharTitle>Catwoman</CharTitle>
                </ImageCont>
                <ImageCont>
                <Image
                    src={imgObj["VaultBoy"]}
                    alt="VaultBoy"
                    opacityLevel={VaultBoyFound ? 0.3 : 1.0}
                    />
                    <CharTitle>Vault Boy</CharTitle>
                </ImageCont>
                <ImageCont>
                <Image
                    src={imgObj["Faith"]}
                    alt="Faith"
                    opacityLevel={FaithFound ? 0.3 : 1.0}
                    />
                    <CharTitle>Faith</CharTitle>
                </ImageCont>

                <ImageCont>
                <Image
                    src={imgObj["Waldo"]}
                    alt="Waldo"
                    opacityLevel={WaldoFound ? 0.3 : 1.0}
                    />
                    <CharTitle>Waldo</CharTitle>
                    </ImageCont>
                </CharaCont> 
            </CharacterField>
            <TimeCont id = "TimeCont"><RenderStopWatch rawTime={timer} /></TimeCont>
            {window.innerWidth > 768 &&
                <ButtonCont>
                    {isUserSignedIn() ?
                        <SignedInCont>
                            <TextBlock>Player: {userName}</TextBlock>
                            <RenderSignOutButton />
                        </SignedInCont>
                        :
                        <RenderGoogleButton />
                    }

                    <Button
                        id="NavResetButton"
                        onClick={() => {
                        setTimer(0)
                        reset()
                    }}>Reset Game</Button>

                </ButtonCont>
            }
            {ButtonComponent()}
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
@media screen and (max-width: 768px){
  display: grid;
  gap: 0;
  position: absolute: 
  left: 50%;
  top: 50%;
}
`

const MobileMenu = styled.div`
    display: block;
    position: fixed; 
    background-color: #fff;
    color:#000; 
    text-align: center;
    width: 50%;
    height: 100%;
    margin: 0;
    padding: 0;
    left: ${props => props.theme.leftShift};
    transition: left 1s;
`
const Text = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    text-align: center;

    @media only screen and (max-width: 768px){
        margin-left: auto; 
        margin-right: auto; 
}
`

const CharacterField = styled.div`
    display: grid; 
`

const CharaCont = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    background-color: #333;
    display: flex;
`

const ImageCont = styled.div`
display: block; 
width: fit-content;
height: fit-content; 
@media screen and (max-width: 768px){
    margin-left: 25px; 
    margin-right: 25px; 
}
    @media only screen and (max-width: 540px){
    margin-left: 10px; 
    margin-right: 10px; 
}
`

const CharTitle = styled.div`
color: #fff; 
margin-left: auto; 
margin-right: auto;
margin-top: 10px; 
text-align: center;
`

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
&#TextMobile{
    color: #000;
    margin-top: 20px;
    margin-bottom: 10px;
}
`


const Image = styled.img`
    opacity: ${props => props.opacityLevel || 1.0}; 
    width: 130px;
    height: 90px; 
    display: inline-block; 
    background-color: rgba(0,0,0,0);
    filter: drop-shadow(5px 5px 5px #ffffff);

    @media only screen and (max-width: 540px){
        width: 90px;
        height: 58px; 
    }
    @media only screen and (max-width: 400px){
        width: 50px;
        height: 40px; 
    }
`
const ButtonCont = styled.div`
display: flex;
justify-content: space-between;
`

const MobileBurger = styled.img`
    width: 30px; 
    height: 30px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px; 
    margin-right: 10px; 
    color: #ffffff; 
`

const Block = styled.div`
    @media only screen and (max-width: 768px){
        display: flex; 
        margin-top: 10px;
        margin-bottom: 10px;
    }
`

const TimeCont = styled.div`
    margin-bottom: auto;
    margin-top: auto;
    font-weight: bold;
    @media only screen and (max-width: 768px){
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
        margin-top: 20px;
    }
`