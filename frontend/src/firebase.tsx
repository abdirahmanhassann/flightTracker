import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyB3qf7dRIqIHHNihy9Uqjqmhp2G9xvtn5E",
    authDomain: "flighttracker-3fbf9.firebaseapp.com",
    projectId: "flighttracker-3fbf9",
    storageBucket: "flighttracker-3fbf9.appspot.com",
    messagingSenderId: "742175351345",
    appId: "1:742175351345:web:683a650a6812422333eb10"
  };
  
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app)
export const storagee=getStorage(app)