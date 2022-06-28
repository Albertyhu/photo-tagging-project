import { db } from '../firebase-config.js'; 
import { doc, setDoc } from "firebase/firestore"; 


export const AddEggs = data => {
    try {
        data.forEach(async val => {
            await setDoc(doc(db, "EasterEgg", val.id), {
                minX: val.minX,
                maxX: val.maxX,
                maxY: val.maxY,
                minY: val.minY,
                id: val.id,
            })
        })
    } catch (e) {
        console.log("Error in adding easter egg: " + e.message)
    }

}