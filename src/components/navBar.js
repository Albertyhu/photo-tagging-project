import styled from 'styled-components'
import React, { useState, useEffect } from 'react'; 
import { RenderSignOutButton } from './signOut.js'; 
import { RenderGoogleButton } from './GoogleAuth.js';
import { getAuth } from 'firebase/auth';
import { imgObj } from '../asset/character_image/charObject.js'; 
import { ButtonCont, Button } from '../style/styledComponents.js';
import { RecordResults } from './recordResults.js';  
import { RenderStopWatch } from './timeComponents.js'
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

    const StopGame = () => {
        StopWatch(); 
        clearInterval(interval)
    }

    useEffect(() => {
        if (preGame) {
            setTimer(0)
        }
    }, [preGame])

    return (
        <BarCont id="BarCont">
            <Text>Find these characters</Text>
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
            <RenderStopWatch rawTime={timer} />
            {isUserSignedIn() ?
                <SignedInCont>
                    <TextBlock>Player: {userName}</TextBlock>
                    <RenderSignOutButton />
                </SignedInCont>
                :
                <RenderGoogleButton />
                }

            <Button onClick={() => {
                setTimer(0)
                reset()
            }}>Reset Game</Button>
    
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
const Text = styled.div`
    margin-top: auto;
    margin-bottom: auto;
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
`

const CharTitle = styled.div`
color: #fff; 
margin-left: auto; 
margin-right: auto;
margin-top: 10px; 
text-align: center;
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


const Image = styled.img`
opacity: ${props => props.opacityLevel || 1.0}; 
width: 130px;
height: 100px; 
display: inline-block; 
background-color: rgba(0,0,0,0);
  filter: drop-shadow(5px 5px 5px #ffffff);
`

const ImageDiv = styled.div`
opacity: 1.0;
width: 130px;
height: 100px; 
display: inline-block; 
background-color: rgba(0,0,0,0);
filter: drop-shadow(5px 5px 5px #ffffff);
background-image: url(${props => props.backgroundImage})
`
const TimerCont = styled.div`
    color: #ffffff
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
`
const Hour = styled.div``
const Minute = styled.div``
const Seconds = styled.div``

