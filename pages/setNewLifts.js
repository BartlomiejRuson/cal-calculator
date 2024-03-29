import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { updateLifts, useAuth } from "../firebase";
import { userContext } from "../src/userContext";
function SetNewLifts() {
  useAuth();
  const sum = (a,b,c) =>{
    return a+b+c;
  }
  const {lifts, setLifts,setPowerliftingScore } = useContext(userContext);
  const [bench,setBench] = useState(0);
  const [deadlift,setDeadlift] = useState(0);
  const [squat,setSquat] = useState(0);
  const Router = useRouter();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      
        await updateLifts({bench,deadlift,squat}).then(()=>{
            setLifts({bench,deadlift,squat})
            setPowerliftingScore(sum(+bench,+squat,+deadlift) )
            
        
             Router.push('/')
        })
    } catch(err){
        console.error(err)
    }
  }
  return (
    <div className="w-screen h-screen bgGradient ">
      <Head>
        <title>Calorie intake counter</title>
        <meta name="description" content="Generated by me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/myprofile">
        <span className="text-white absolute top-2 left-2 cursor-pointer">
          go back to my profile
        </span>
      </Link>
      <div className="bg-white w-5/6 h-96 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute top-1/2">
        <form
          className="h-full justify-around flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <fieldset className="flex gap-5">
            <h2>Bench press:</h2>
            <input
              type="number"
              name="Bench"
              id="Bench"
              onChange={(e) => {
                setBench(e.target.value);
              }}
            />
            <label htmlFor="Bench">Kg</label>
          </fieldset>
          <fieldset className="flex gap-5">
          <h2>Deadlift:</h2>
            <input
              type="number"
              name="Deadlift"
              id="Deadlift"
              onChange={(e) => {
                setDeadlift(e.target.value);
              }}
            />
            <label htmlFor="Deadlift">Kg</label>
          </fieldset>
          <fieldset className="flex gap-5">
          <h2>Squat:</h2>
            <input
              type="number"
              name="Squat"
              id="Squat"
              onChange={(e) => {
                setSquat(e.target.value);
              }}
            />
            <label htmlFor="Squat">Kg</label>
          </fieldset>
         
          <button type="submit" className="bgGradient">SET</button>
        </form>
      </div>
    </div>
  );
}

export default SetNewLifts;
