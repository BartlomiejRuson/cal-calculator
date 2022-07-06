import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,collection,getDocs,addDoc,updateDoc,doc} from 'firebase/firestore'
import { useContext, useEffect, useState } from "react";
import { userContext } from "./src/userContext";




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
   .then((value)=>{
    initUserRequirement(value.user.uid);
   },(reaseon)=>{
    console.log(reaseon);
   })
}

export const initUserRequirement = (id)=>{
  addDoc(colRef,{
    userId:id,dailyRequirement:0
  })
}

export const logout = async () =>{
  signOut(auth);
  console.log(auth);
}

export const signin = (email,password) =>{
 return signInWithEmailAndPassword(auth,email,password);
}

export const useAuth = ()=>{
  const {user,setUser,dailyRequirement,setDailyRequirement} = useContext(userContext);
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{
    setUser(user);
    getDocs(colRef).then(snapshot=>{

      snapshot.docs.forEach(doc=>{
        if(user!=null && doc.data().userId == user.uid){ 
          console.log("heyyy")
          setDailyRequirement(doc.data().dailyRequirement);
        }
  
     })
  
    })
    })
    return unsub;
  },[])
  return {user,dailyRequirement}
}
export const changeDailyRequirement = async (bmr) =>{
  getDocs(colRef).then(snapshot=>{
    snapshot.docs.forEach(document=>{
      if(auth.currentUser.uid==document.data().userId){
       const docRef = doc(db,"userCalRequirements",document.id)

      updateDoc(docRef,{
          dailyRequirement:bmr
        })
      }
    })
  })
}