// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'; 

const key = `${process.env.REACT_APP_FIREBASE_KEY}`

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: key,
    authDomain: "photo-tagging-project.firebaseapp.com",
    projectId: "photo-tagging-project",
    storageBucket: "photo-tagging-project.appspot.com",
    messagingSenderId: "895409947230",
    appId: "1:895409947230:web:1a77d28a104e7ea4f16acf"
};

export const getFirebaseConfig = () => {
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        console.log("Firebase has not been loaded yet")
    }
    else
        return firebaseConfig
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
export { db }; 