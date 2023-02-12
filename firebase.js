import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,collection,getDocs,addDoc,updateDoc,doc} from 'firebase/firestore'
import { useContext, useEffect} from "react";
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
  const liftsRef = collection(db,"userLifts")
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
    userId:id,
    dailyRequirement:0,
    weight:0
  })
  addDoc(liftsRef,{
    userId:id,
    bench:0,
    deadlift:0,
    squat:0
  })
}

export const logout = async () =>{
  signOut(auth);
}

export const signin = (email,password) =>{
 return signInWithEmailAndPassword(auth,email,password);
}

export const useAuth = ()=>{
  const {user,setUser,dailyRequirement,setDailyRequirement,newWeight,setNewWeight,lifts,setLifts,powerliftingScore,setPowerliftingScore} = useContext(userContext);
  
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{
    setUser(user);
    //synchronize user cal req and weigth
    getDocs(colRef).then(snapshot=>{
      snapshot.docs.forEach(doc=>{
        if(user!=null && doc.data().userId == user.uid){ 
          setDailyRequirement(doc.data().dailyRequirement);
          setNewWeight(doc.data().weight);
        }
  
     })
  
    })
    // synchronize lifts
    getDocs(liftsRef).then(snapshot=>{
      snapshot.docs.forEach(doc=>{
        if(user!=null && doc.data().userId == user.uid){ 
          setLifts({bench:doc.data().bench,deadlift:doc.data().deadlift,squat:doc.data().squat})
          setPowerliftingScore(parseInt (doc.data().bench)+parseInt (doc.data().deadlift)+parseInt (doc.data().squat));
        }
  
     })
  
    })
    })
    return unsub;
  },[])
  return {user,dailyRequirement,newWeight,lifts,powerliftingScore}
}
export const changeDailyRequirement = async (bmr,weight) =>{
  getDocs(colRef).then(snapshot=>{
    snapshot.docs.forEach(document=>{
      if(auth.currentUser.uid==document.data().userId){
       const docRef = doc(db,"userCalRequirements",document.id)
        console.log(bmr,weight)
      updateDoc(docRef,{
          dailyRequirement:bmr,
          weight:weight
        })

      }
    })
  })
}
export const updateLifts = async ({bench,deadlift,squat}) =>{
  console.log(bench,deadlift,squat)
  
  getDocs(liftsRef).then(snapshot=>{

    snapshot.docs.forEach(document=>{
      
      if(auth.currentUser.uid==document.data().userId){
       const liftsRef = doc(db,"userLifts",document.id)
       



      updateDoc(liftsRef,{
          bench:bench,
          deadlift:deadlift,
          squat:squat
        })

      } else{

      }
    })
  }).catch(err=>{
    console.log(err)

  })
}