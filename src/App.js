import React, { useState, useEffect, useRef, useCallback } from 'react'; 
import { onAuthStateChanged, getAuth } from 'firebase/auth'; 
import RenderMainPhoto from './components/MainPhotoArea.js'; 
import NavBar from './components/navBar.js'; 
import { MyContext } from './components/contextItem.js'; 
import { printCoordinates } from './components/registerClicks.js';
import { AddEggs } from './components/addEggs.js'; 
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from './firebase-config.js'; 
import RenderQueryMenu from './components/queryMenu.js'; 
import { Dots } from "react-activity";
import { LoadingContainer, MainContainer } from "./style/styledComponents.js";
import "react-activity/dist/library.css";
import "./style/myStyle.css"; 
import PreGamePanel from './components/preGamePanel.js'; 
import { RenderSignInPanel } from './components/GoogleAuth.js'; 
import RenderMessagePanel from './components/message.js'; 
import RenderMarker from './components/marker.js'; 
import ResultsPanel from './components/resultsPanel.js'; 
import uuid from 'react-uuid';

const auth = getAuth(); 

function getUserName() {
    return auth.currentUser.displayName; 
}

function App() {
    window.onload = function () {
        initFirebaseAuth();
        getData();
        getRecord(); 
    }
    //easterEggs is an array that contains coordinates and status of the easter eggs 
    const [easterEggs, setEasterEggs] = useState([])
    const [preGame, setPreGame] = useState(true); 
    const [runTime, setRunTime] = useState(false); 
    const [finalTime, setFinalTime] = useState(0);
    const [gameOver, setGameOver] = useState(false); 
    const [userName, setUserName] = useState('')
    const [displayQuery, setDisplayQuery] = useState(false); 
    const [selected, setSelected] = useState('')
    const [clickedEgg, setClickedEgg] = useState('')
    const [loading, setLoading] = useState(false); 
    const [CatwomanFound, setCatFound] = useState(false);
    const [VaultBoyFound, setVaultFound] = useState(false);
    const [FaithFound, setFaithFound] = useState(false); 
    const [WaldoFound, setWaldoFound] = useState(false); 
    const [messagePanel, setMessagePanel] = useState(false); 
    const [existingMarkers, setExistingMarkers] = useState([])
    const [displayMarkers, setDisplayMarkers] = useState(false); 
    const [message, setMessage] = useState('')
    const [record, setRecord] = useState([]); 
    const [isTimeRecorded, setisTimeRecorded] = useState(false)
    //coordinates for the query menu 
    const [yCoordinate, setYCoor] = useState('50%')
    const [xCoordinate, setXCoor] = useState('50%')

    var queryRef = useRef();  
    var photoRef = useRef(); 
    var messageRef = useRef(); 
    const context = {
        returnUserName: () => userName,
    }
    function initFirebaseAuth() {
        // Listen to auth state changes.
        onAuthStateChanged(auth, authStateObserver);
    }

    function authStateObserver(user) {
        if (user) { // User is signed in!
            setUserName(getUserName())
        } else { // User is signed out!
            setUserName('')
        }
    }

    //getData retries the information of each of the easter eggs 
    //The information includes the coordinates of the hit box referenced by minX, maxX, minY and maxY
    //markerX and markerY are the coordinate of each of the easter egg's markers
    //When the player finds the easter egg, a marker will be added to their location
    //The markers are ratios that will be used to multiply the offsetHeight and offsetWidth of the easter's location
    //Thus, this will location the exact coordinates where the markers should be placed 
    const getData = async () => {
        const q = query(collection(db, "EasterEgg"))
        const querySnapshot = await getDocs(q);
        var data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.data().id,
                minX: doc.data().minX,
                maxX: doc.data().maxX,
                minY: doc.data().minY,
                maxY: doc.data().maxY,
                markerX: doc.data().markerX, 
                markerY: doc.data().markerY, 
                found: false,
            })
        })
        setEasterEggs(data)
    }

    const getRecord = async () => {
        var arr = []; 
        try {
            const q = query(collection(db, "record"), orderBy("time", "asc"))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(snap => {
                arr.push({
                    username: snap.data().username,
                    time: snap.data().time,
                    date: snap.data().date,
                })
            })
            setRecord(arr)
        }
        catch (e) {
            console.log("Error in retrieving Records (App.js 121): " + e.message)
        }
    }

    const reset = () => {
        setSelected(''); 
        setClickedEgg(''); 
    }

    //starts the game and the timer 
    const startGame = () => {
        setPreGame(false); 
        setRunTime(true)
    }

    const StopWatch = () => {
        setRunTime(false); 
    }

    const resetGame = () => {
        var arr = easterEggs; 
        arr.forEach(val => {
            val.found = false; 
        })
        setEasterEggs(arr); 
        reset(); 
        resetStatus(); 
        setGameOver(false)
        setExistingMarkers([]);
        setDisplayMarkers(false);
        setPreGame(true);
        setisTimeRecorded(false);
        //need functionality to reset timer 
    }

    //Only activates when the image is clicked. Doesn't activate when the menu is clicked 
    const clickEvent = event => {
        //starting situation where the user clicks on the image 
        if (!displayQuery
            && photoRef.current.contains(event.target)) {
            checkDataArray(event)
            setXCoor(event.offsetX)
            setYCoor(event.offsetY)
            setDisplayQuery(true)

        }
        //user clicks into the menu 
        else if (displayQuery
            && photoRef.current.contains(event.target)
            && !queryRef.current.contains(event.target)
        ) {
            setDisplayQuery(false)
            reset(); 
        }
        else if (displayQuery && !photoRef.current.contains(event.target)) {
            setDisplayQuery(false)
        } 
       
    }


    const checkDataArray = event => {
        easterEggs.forEach(val => { checkIfClicked(event, val) })
    }

    //When the user clicks on the easter, clickedEgg state component will record the id of the egg clicked
    //Later when the user selects a value from the query menu, the app will compare clickedEgg with the selected value 
    const checkIfClicked = (event, object) => {
        // console.log(`checkIfClicked: (${event.offsetX}, ${event.offsetY})`)
        if (checkY(object, event.offsetY) && checkX(object, event.offsetX)) {
            setClickedEgg(object.id);
        }
        else
            setSelected('')
    }

    //check is the click's y coordinate falls inside the easter egg's hitbox 
    const checkY = (object, yClick) => {
        var divHeight = parseFloat(document.getElementById('PhotoBody').offsetHeight);
        var yLocation = (yClick / divHeight).toFixed(2)
        //console.log("yLocation: " + yLocation)
        if (yLocation <= object.minY && yLocation >= object.maxY) {
            return true
        }
        else
            return false
    }

    //check is the click's x coordinate falls inside the easter egg's hitbox 
    const checkX = (object, xClick) => {
        var xLocation = (parseFloat(xClick / window.innerWidth)).toFixed(2);
          //console.log("xLocation: " + xLocation)
        if (xLocation >= object.minX && xLocation <= object.maxX) {
            return true;
        }
        else
            return false
    } 

    //This code is responsible for figuring if the clicked easter egg matches the selected answer 
    //...that the user selects from the query menu. 
    const checkIfEasterEggIsClicked = () => {
        var isFound = false; 
        if (selected === clickedEgg && selected !== '' && clickedEgg !== '') {
            var arr = easterEggs; 
            arr.forEach(val => {
                if (val.id === selected && !val.found) {
                    //update the found egg's status
                    val.found = true;
                    updateStatus(val.id)
                    openMessagePanel("You found " + selected + ".")
                    //place a marker
                    var markerArr = existingMarkers;
                    var markerCoor = {
                        markerX: val.markerX,
                        markerY: val.markerY,
                    }
                    markerArr.push(markerCoor)
                    setExistingMarkers(markerArr)
                }
                else if (val.id === selected && val.found) {
                    openMessagePanel("You have already found " + selected + ".")
                }
                isFound = true; 
            })
            if (!isFound) {
                openMessagePanel("Try again.")
            }
            isFound = false;

            setEasterEggs(arr)
            if (checkIfAllFound()) {
                closeGame();
            }
            reset();
        }
    }

    //updates the found status of the found easter egg so that its avatar because darker in the nav bar
    const updateStatus = (id) => {
        switch (id) {
            case "Catwoman": {
                setCatFound(true);
                return; 
            }
            case "Vault Boy": {
                setVaultFound(true); 
                return; 
            }
            case "Faith": {
                setFaithFound(true);
                return; 
            }
            case "Waldo": {
                setWaldoFound(true);
                return;
            }
            default:
                return; 
        }
    }

    //resets the easter egg's status 
    const resetStatus = () => {
        setCatFound(false);
        setFaithFound(false);
        setWaldoFound(false);
        setVaultFound(false); 
    }

    //This function checks if all the easter eggs have been found 
    const checkIfAllFound = () => {
        var allFound = true; 
        if (easterEggs.length > 0) {
            easterEggs.forEach(val => {
             //   console.log(val.id + ".found = " + val.found)
                if (val.found === false || val.found === null || val.found === undefined) {
                    allFound = false;
                }
            })
        }
        else {
            allFound = false; 
        }
        return allFound; 
    }

    //This function is triggered after the player has found all easter eggs
    const closeGame = () => {
        setRunTime(false);
        setGameOver(true); 
        openMessagePanel("Congrats! You found all the characters!")
    }


    const toggleQueryDisplay = (event) => {
        if(photoRef.current && photoRef.current.contains(event.target))
            setDisplayQuery(!displayQuery)

    }

    const closeQueryDisplay = () => {
        setDisplayQuery(false)
    }

    const openMessagePanel = mess => {
        setMessage(mess)
        setMessagePanel(true)
    }

    //having easterEggs as a dependency here is necessary
    //Before implementing this code, 
    //..the functions associated with clickEvent was using the old value
    //Thus, when the user is clicking on an easter egg, the function is using an empty array
    //This useEffect block updates the clickEvent function with the new easterEgg state object
    useEffect(() => {
        if (userName !== '' && !preGame && !gameOver)
           window.addEventListener("mousedown", clickEvent)
        return () => {
            window.removeEventListener("mousedown", clickEvent)
        }
    }, [easterEggs, displayQuery, preGame, userName])

    useEffect(() => {
        checkIfEasterEggIsClicked()
    }, [selected])

    useEffect(() => {
        if (easterEggs.length != 0) {
            setLoading(false)
        }
        else {
            setLoading(true)
        }
    }, [easterEggs])

    useEffect(() => {
        if (existingMarkers.length > 0) {
            setDisplayMarkers(true)
        }
    }, [existingMarkers.length])

    return (
        <MyContext.Provider value={context}>
            <div className = "app">
                {!loading ? 
                    <>
                        {userName !== '' ?
                            preGame &&
                            <PreGamePanel startGame={startGame} />
                            :
                            <RenderSignInPanel />
                                }
                        <MainContainer opacityLevel={preGame ? 0.3 : 1.0}>
                            <RenderMessagePanel
                                message={message}
                                messageRef={messageRef}
                                messagePanel={messagePanel}
                                setMessagePanel={setMessagePanel}
                            />
                            {displayMarkers ?
                                existingMarkers.map(item => <RenderMarker markerX={item.markerX} markerY={item.markerY} key={uuid()}/>)
                                :
                                null
                            }
                            {gameOver ? 
                                <ResultsPanel
                                    resetGame={resetGame}
                                    record={record}
                                    finalTime={finalTime}
                                /> 
                                :
                                null}
                            <NavBar userName={userName}
                                reset={resetGame}
                                CatwomanFound={CatwomanFound}
                                VaultBoyFound={VaultBoyFound}
                                FaithFound={FaithFound}
                                WaldoFound={WaldoFound}
                                runTime={runTime}
                                StopWatch={StopWatch}
                                setFinalTime={setFinalTime}
                                openMessagePanel={openMessagePanel}
                                getRecord={getRecord}
                                checkIfAllFound={checkIfAllFound}

                                //The following code is meant to prevent the app from automatically pushing results to firebase unintentionally
                                isTimeRecorded={isTimeRecorded}
                                setisTimeRecorded={setisTimeRecorded}
                                //resets the timer when preGame changes 
                                preGame={preGame}
                                        />
                                    <RenderMainPhoto func={toggleQueryDisplay} photoRef={photoRef} />
                                    {displayQuery &&
                                        <RenderQueryMenu
                                            queryRef={queryRef}
                                            setSelected={setSelected}
                                            closeQueryDisplay={closeQueryDisplay}
                                            xCoor={xCoordinate}
                                            yCoor={yCoordinate}
                                        />
                                    }
                                </MainContainer>

                        </>
                    :
                    <LoadingContainer>Loading <Dots style={loadingStyle} /></LoadingContainer>
            }
            </div>
            

        </MyContext.Provider>
  );
}

export default App;



const loadingStyle = {
    color: "#fff",
    marginLeft: "10px",
}