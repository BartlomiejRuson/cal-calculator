
import React, { useState,useEffect } from "react";

function Tables({currentFood}) {
  const [bre, setBre] = useState([{ id: 111, name: "cereal", kcals: 125 },]);
  const [lun, setLun] = useState([{ id: 222, name: "sandwich", kcals: 225 },]);
  const [din, setDin] = useState([{ id: 333, name: "spaghetti", kcals: 325 },]);
  const [sna, setSna] = useState([{ id: 444, name: "fries", kcals: 425 },]);
  console.log(currentFood)
//   useEffect((currentFood)=>{
//     switch(currentFood.dish){
//         case "breakfast":
//             bre.push({id:1111,name:currentFood.name,kcals:currentFood.kcals})
//     }
    
// },[currentFood])
  return (
    <>
      <div>
        <h2>Breakfast</h2>
        <div>
          {bre.map((item) => (
            <div key={item.id}>
              
              <p>{item.name}</p>
              <p>{item.kcals}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Lunch</h2>
        <div>
          {lun.map((item) => (
            <div key={item.id}>
              
              <p>{item.name}</p>
               <p>{item.kcals}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Dinner</h2>
        <div>
          {din.map((item) => (
            <div key={item.id}>
              
              <p>{item.name}</p>
               <p>{item.kcals}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Snacks</h2>
        <div>
          {sna.map((item) => (
            <div key={item.id}>
              
              <p>{item.name}</p>
               <p>{item.kcals}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tables;
