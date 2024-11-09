import { getDatabase } from 'firebase/database';
import firebase from 'firebase/compat/app';
import {getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyDWSIbP5c2zxUHhE-6JFT4sC0STp6ZInCI",
  authDomain: "brigade-ev-charging.firebaseapp.com",
  databaseURL: "https://brigade-ev-charging-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "brigade-ev-charging",
  storageBucket: "brigade-ev-charging.appspot.com",
  messagingSenderId: "224052204262",
  appId: "1:224052204262:web:436ae78cf3584b3bc72127",
  measurementId: "G-46R5Q5G2ES"

}

const app = initializeApp(firebaseConfig);
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

export const rdb= getDatabase();
export const db = getFirestore(app);
