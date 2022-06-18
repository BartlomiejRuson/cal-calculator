import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,collection,getDocs,addDoc} from 'firebase/firestore'
import { useEffect, useState } from "react";


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
  const db = getFirestore();
  const colRef = collection(db,"userCalRequirements")
export default app;

export const signup = (email,password)=>{
  
 createUserWithEmailAndPassword(auth,email,password)
   .then(function onFulfilled(value){
    initUserRequirement(value.user.uid);
   },function onRejected(reaseon){
    console.log(reaseon);
   })
}

export const initUserRequirement = (id)=>{
  addDoc(colRef,{
    userId:id,dailyRequirement:0
  })
}

export const logout = () =>{
  signOut(auth);
}

export const signin = (email,password) =>{
  return signInWithEmailAndPassword(auth,email,password)
}

export const useAuth = ()=>{
  const [currentUser,setCurrentUser] = useState();
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{
    setCurrentUser(user);
    })
    return unsub;
  },[])
  return currentUser
}