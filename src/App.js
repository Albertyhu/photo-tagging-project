import React, { useState, useEffect, useRef, useCallback } from 'react'; 
import { onAuthStateChanged, getAuth } from 'firebase/auth'; 
import RenderMainPhoto from './components/MainPhotoArea.js'; 
import NavBar from './components/navBar.js'; 
import { MyContext } from './components/contextItem.js'; 
import { printCoordinates } from './components/registerClicks.js';
import { AddEggs } from './components/addEggs.js'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './firebase-config.js'; 
//import { getData, checkDataArray  } from './components/searchFunctions.js'; 
import RenderQueryMenu from './components/queryMenu.js'; 
import { Dots } from "react-activity";
import { LoadingContainer } from "./style/styledComponents.js";
import "react-activity/dist/library.css";
import "./style/myStyle.css"; 

const auth = getAuth(); 



function getUserName() {
    return auth.currentUser.displayName; 
}

function App() {
    window.onload = function () {
        initFirebaseAuth();
        getData();
    }
    const [easterEggs, setEasterEggs] = useState([])
    const [eggArray, setEggArray] = useState([])
    const [userName, setUserName] = useState('')
    const [displayQuery, setDisplayQuery] = useState(false); 
    const [selected, setSelected] = useState('')
    const [clickedEgg, setClickedEgg] = useState('')
    const [loading, setLoading] = useState(false); 

    //coordinates for the query menu 
    const [yCoordinate, setYCoor] = useState('50%')
    const [xCoordinate, setXCoor] = useState('50%')

    var queryRef = useRef();  
    var photoRef = useRef(); 

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
                found: false,
            })
        });
        setEasterEggs(data)
    }

    const reset = () => {
        console.log('reset')
        setSelected(''); 
        setClickedEgg(''); 
    }

    //Only activates when the image is clicked. Doesn't activate when the menu is clicked 
    /*
    const clickEvent = event => {
        toggleQueryDisplay(event);
        //When the user clicks on the menu
         if (displayQuery) {
           // reset(); 
        }
        //When the user clicks on the image 
        else {
              checkDataArray(event)
        }
    }*/
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
        if (yLocation <= object.minY && yLocation >= object.maxY) {
            return true
        }
        else
            return false
    }

    //check is the click's x coordinate falls inside the easter egg's hitbox 
    const checkX = (object, xClick) => {
        var xLocation = (parseFloat(xClick / window.innerWidth)).toFixed(2);
        //  console.log("xLocation: " + xLocation)
        if (xLocation >= object.minX && xLocation <= object.maxX) {
            return true;
        }
        else
            return false
    } 

    //do not used 
    const checkIfClickedOutsideQuery = e => {
        if (displayQuery && queryRef.current && !queryRef.current.contains(e.target)) {
          //  setDisplayQuery(false)
        }
        else {
          //  setDisplayQuery(true)
        }
    }

    const checkIfEasterEggIsClicked = () => {
        console.log("selected = " + selected)

        if (selected === clickedEgg && selected !== '' && clickedEgg !== '') {
            var arr = easterEggs; 
            arr.forEach(val => {
                if (val.id === selected) {
                    val.found = true; 
                }
            })
            console.log("You found " + selected)
            setEasterEggs(arr)
            reset();
        }
    }

    const toggleQueryDisplay = (event) => {
        if(photoRef.current && photoRef.current.contains(event.target))
            setDisplayQuery(!displayQuery)

    }

    const closeQueryDisplay = () => {
        setDisplayQuery(false)
    }

    //having easterEggs as a dependency here is necessary
    //Before implementing this code, 
    //..the functions associated with clickEvent was using the old value
    //Thus, when the user is clicking on an easter egg, the function is using an empty array
    //This useEffect block updates the clickEvent function with the new easterEgg state object
    useEffect(() => {
        window.addEventListener("click", clickEvent)
        return () => {
            window.removeEventListener("click", clickEvent)
        }
    }, [easterEggs, displayQuery])

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
        if (displayQuery) {
            console.log("Menu is opened")
        }
        else 
            console.log("Menu is closed")
    }, [displayQuery])

    return (
        <MyContext.Provider value={context}>

            <div className="App">
                {!loading ? 
                    <>
                <NavBar userName={userName} />
                <RenderMainPhoto func={toggleQueryDisplay} photoRef={photoRef} />
                {displayQuery && 
                    <RenderQueryMenu
                            queryRef={queryRef}
                            setSelected={setSelected}
                            closeQueryDisplay={closeQueryDisplay}
                            checkIfEasterEggIsClicked={checkIfEasterEggIsClicked}
                            xCoor={xCoordinate}
                            yCoor={yCoordinate}
                     /> 
                        }
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

    marginLeft: "10px",
}