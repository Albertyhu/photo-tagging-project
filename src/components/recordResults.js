import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase-config.js'; 
import { genKey } from './randGen.js'; 
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
 
export const RecordResults = async(userName, timeFinished, getRecord) => {
    const key = genKey(10)
    console.log(timeFinished)
    try {
        await setDoc(doc(db, "record", key), {
            username: userName,
            time: timeFinished,
            date: firebase.firestore.Timestamp.now(),
        })
            .then(() => { getRecord()})
    }
    catch (e){ console.log(e.message) }
}