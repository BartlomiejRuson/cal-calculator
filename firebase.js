import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCwpN8AI1336f0vuVgNhIS4GLe39V4RDfQ",
  
    authDomain: "cal-calculator-86af7.firebaseapp.com",
  
    projectId: "cal-calculator-86af7",
  
    storageBucket: "cal-calculator-86af7.appspot.com",
  
    messagingSenderId: "977949079433",
  
    appId: "1:977949079433:web:c23fd9c09432f648e71358",
  
    measurementId: "G-N9Y69L03ZJ",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

export default app;

export const signup = (email,password)=>{
 return createUserWithEmailAndPassword(auth,email,password)
}