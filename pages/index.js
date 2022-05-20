import Head from "next/head";
import { useState, useEffect } from "react";
import uuid from "react-uuid";

export default function Home() {
  const [bre, setBre] = useState([{ id: 111, name: "cereal", kcals: 125 }]);
  const [lun, setLun] = useState([{ id: 222, name: "sandwich", kcals: 225 }]);
  const [din, setDin] = useState([{ id: 333, name: "spaghetti", kcals: 325 }]);
  const [sna, setSna] = useState([{ id: 444, name: "fries", kcals: 425 }]);
  const [ingr, setIngr] = useState("");
  const [dish, setDish] = useState("");
  const [kcals, setKcals] = useState(0);
  const [currentFood, setCurrentFood] = useState({
    name: "",
    dish: "",
    kcals: "",
  });

  const deleteFood = (id,dish) =>{
    console.log("delete clicked")
    switch(dish){
      case "breakfast":
        const newBreakfast= bre.filter((item)=>{return item.id != id })
        setBre(newBreakfast);
      break;
      case "lunch":
        const newLunch= lun.filter((item)=>{return item.id != id })
        setLun(newLunch);
      break;
      case "dinner":
        const newDinner= din.filter((item)=>{return item.id != id })
        setDin(newDinner);
      break;
      case "snacks":
        const newSnacks= sna.filter((item)=>{return item.id != id })
        setSna(newSnacks);
      break;
      default:
    }
  }

  useEffect(() => {

    switch (dish) {
      case "breakfast":
        setBre([
          ...bre,
          { id: uuid(), name: currentFood.name, kcals: currentFood.kcals },
        ]);
        break;
      case "lunch":
        setLun([
          ...lun,
          { id: uuid(), name: currentFood.name, kcals: currentFood.kcals },
        ]);
        break;
      case "dinner":
        setDin([
          ...din,
          { id: uuid(), name: currentFood.name, kcals: currentFood.kcals },
        ]);
        break;
      case "snacks":
        setSna([
          ...sna,
          { id: uuid(), name: currentFood.name, kcals: currentFood.kcals },
        ]);
        break;
      default:
       
    }
  }, [currentFood]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
        "X-RapidAPI-Key": "ed891157f5mshc9042211f64f080p1bbbf9jsnedd6101045bb",
      },
    };

    fetch(
      "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=" +
        ingr,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setCurrentFood({
          name: ingr,
          dish: dish,
          kcals: response.parsed[0].food.nutrients.ENERC_KCAL,
        })
      )
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Head>
        <title>Calorie intake counter</title>
        <meta name="description" content="Generated by me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>nav</nav>
      <main>
        <div>
          <h2>Breakfast</h2>
          <div>
            {bre.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>{item.kcals}</p>
                <div onClick={()=>{deleteFood(item.id,"breakfast")}}>delete me</div>
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
                <div onClick={()=>{deleteFood(item.id,"lunch")}}>delete me</div>
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
                <div onClick={()=>{deleteFood(item.id,"dinner")}}>delete me</div>
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
                <div onClick={()=>{deleteFood(item.id,"snacks")}}>delete me</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <form onSubmit={handleSubmit}>
        <h3>Add something</h3>
        <label htmlFor="food">Food</label>
        <input
          type="text"
          name="food"
          id="food"
          onChange={(e) => setIngr(e.target.value)}
        />
        <input
          type="radio"
          name="dish"
          id="Breakfast"
          value="breakfast"
          onChange={(e) => {
            setDish(e.target.value);
          }}
        />
        <label htmlFor="breakfast">Breakfast</label>
        <input
          type="radio"
          name="dish"
          id="Lunch"
          value="lunch"
          onChange={(e) => {
            setDish(e.target.value);
          }}
        />
        <label htmlFor="Lunch">Lunch</label>
        <input
          type="radio"
          name="dish"
          id="Dinner"
          value="dinner"
          onChange={(e) => {
            setDish(e.target.value);
          }}
        />
        <label htmlFor="Dinner">Dinner</label>
        <input
          type="radio"
          name="dish"
          id="Snacks"
          value="snacks"
          onChange={(e) => {
            setDish(e.target.value);
          }}
        />
        <label htmlFor="Snacks">Snacks</label>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}
