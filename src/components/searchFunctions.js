import React, { useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase-config.js'; 

export const getData = async (setEasterEggs) => {
    const q = query(collection(db, "EasterEgg"))
    const querySnapshot = await getDocs(q);
    var data = []
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
    console.log(data)
    setEasterEggs(data)
}


export const checkDataArray = event => {
    data.forEach(val => { checkIfClicked(event, val) })
}

const checkIfClicked = (event, object) => {
    // console.log(`(${event.offsetX}, ${event.offsetY})`)
    if (checkY(object, event.offsetY) && checkX(object, event.offsetX)) {
        alert(object.id + " is found!");
    }
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