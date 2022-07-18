import Head from "next/head";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import Nav from "./components/Nav";

export default function Home({ myKey }) {
  const apiKey = myKey.toString();
  const [loading, setLoading] = useState(false);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [breakfastTotal, setBreakfastTotal] = useState(0);
  const [lunchTotal, setLunchTotal] = useState(0);
  const [dinnerTotal, setDinnerTotal] = useState(0);
  const [snacksTotal, setSnacksTotal] = useState(0);
  const [dayTotal, setDayTotal] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [dish, setDish] = useState("");
  const [errorText, setErrorText] = useState("");
  const [currentFood, setCurrentFood] = useState({
    name: "",
    dish: "",
    kcals: "",
  });

  const clearArrays = () => {
    setBreakfast([]);
    setLunch([]);
    setDinner([]);
    setSnacks([]);
    setBreakfastTotal(0);
    setLunchTotal(0);
    setDinnerTotal(0);
    setSnacksTotal(0);
    setDayTotal(0);
  };

  // this button appears on the screen when you are using mobile view
  const hideButton = async () => {
    const myForm = document.querySelector(".myform");
    const myButton = document.querySelector(".plusButton");
    const myFormPosition = myForm.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    if (myFormPosition < screenPosition - 60) {
      myButton.classList.add("hidden");
    } else {
      myButton.classList.remove("hidden");
    }
  };

  if (typeof window === !"undefined") {
    window.addEventListener("scroll", hideButton);
  }

  const deleteFood = (id, dish, kcals) => {
    switch (dish) {
      case "breakfast":
        const newBreakfast = breakfast.filter((item) => {
          return item.id != id;
        });
        setBreakfast(newBreakfast);
        setBreakfastTotal(breakfastTotal - kcals);
        setDayTotal(dayTotal - kcals);
        break;
      case "lunch":
        const newLunch = lunch.filter((item) => {
          return item.id != id;
        });
        setLunch(newLunch);
        setLunchTotal(lunchTotal - kcals);
        setDayTotal(dayTotal - kcals);
        break;
      case "dinner":
        const newDinner = dinner.filter((item) => {
          return item.id != id;
        });
        setDinner(newDinner);
        setDinnerTotal(dinnerTotal - kcals);
        setDayTotal(dayTotal - kcals);
        break;
      case "snacks":
        const newSnacks = snacks.filter((item) => {
          return item.id != id;
        });
        setSnacks(newSnacks);
        setSnacksTotal(snacksTotal - kcals);
        setDayTotal(dayTotal - kcals);
        break;
      default:
    }
  };

  //this useEffect is triggered after the form with new food is submited
  useEffect(() => {
    switch (dish) {
      case "breakfast":
        setBreakfast([
          ...breakfast,
          { id: uuid(), name: currentFood.name, kcals: currentFood.kcals },
        ]);
        setBreakfastTotal(breakfastTotal + currentFood.kcals);
        setDayTotal(dayTotal + currentFood.kcals);

        break;
      case "lunch":
        setLunch([
          ...lunch,
          { id: uuid(), name: currentFood.name, kcals: currentFood.kcals },
        ]);
        setLunchTotal(lunchTotal + currentFood.kcals);
        setDayTotal(dayTotal + currentFood.kcals);

        break;
      case "dinner":
        setDinner([
          ...dinner,
          { id: uuid(), name: currentFood.name, kcals: currentFood.kcals },
        ]);
        setDinnerTotal(dinnerTotal + currentFood.kcals);
        setDayTotal(dayTotal + currentFood.kcals);

        break;
      case "snacks":
        setSnacks([
          ...snacks,
          { id: uuid(), name: currentFood.name, kcals: currentFood.kcals },
        ]);
        setSnacksTotal(snacksTotal + currentFood.kcals);
        setDayTotal(dayTotal + currentFood.kcals);

        break;
      default:
    }
  }, [currentFood]);

  // if the value from input isn't undefined this function makes the query to EdamamFod API,
  //  then it sets the currentFood variable which triggers useEffect hook.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
        "X-RapidAPI-Key": apiKey,
      },
    };
    if (ingredient&&apiKey) {
    }
    fetch(
      "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=" +
        ingredient,
      options
    )
      .then((response) => {
        if (response.status == 200) {
          setErrorText("");
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((response) => {
        setCurrentFood({
          name: ingredient,
          dish: dish,
          kcals: response.parsed[0].food.nutrients.ENERC_KCAL,
        });
        setIngredient("");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setErrorText("you need to type in specific food name");
        setLoading(false);
      });
  };
  return (
    <div className="h-screen bg-myDarkBlue">
      <Head>
        <title>Calorie intake counter</title>
        <meta name="description" content="Generated by me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav dayTotal={dayTotal} setDayTotal={setDayTotal} clearArrays={clearArrays} />
      <main className="flex flex-col  md:flex-row md:justify-around text-center bg-gray-100 md:py-5">
        <div className="w-full border mx-1  border-gray-300">
          <h2 className="text-xl font-semibold">Breakfast</h2>
          <div className="h-72 overflow-y-scroll scrollbar">
            {breakfast.map((item) => (
              <div
                className="flex gap-2 my-1  py-2 max-h-full justify-center "
                key={item.id}
              >
                <p className="border-r border-black pr-2">{item.name}</p>
                <p className="border-r border-black pr-2">{item.kcals} kcals</p>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    deleteFood(item.id, "breakfast", item.kcals);
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <p className="font-semibold text-lg mt-3">Total: {breakfastTotal}</p>
        </div>
        <div className="w-full border mx-1 border-gray-300">
          <h2 className="text-xl font-semibold">Lunch</h2>
          <div className="h-72 overflow-y-scroll scrollbar">
            {lunch.map((item) => (
              <div className="flex gap-2 py-2  justify-center" key={item.id}>
                <p className="border-r border-black pr-2">{item.name}</p>
                <p className="border-r border-black pr-2">{item.kcals} kcals</p>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    deleteFood(item.id, "lunch", item.kcals);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <p className="font-semibold text-lg mt-3">Total: {lunchTotal}</p>
        </div>
        <div className="w-full border mx-1 border-gray-300">
          <h2 className="text-xl font-semibold">Dinner</h2>
          <div className="h-72 overflow-y-scroll scrollbar">
            {dinner.map((item) => (
              <div className="flex gap-2 py-2 justify-center" key={item.id}>
                <p className="border-r border-black pr-2">{item.name}</p>
                <p className="border-r border-black pr-2">{item.kcals} kcals</p>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    deleteFood(item.id, "dinner", item.kcals);
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <p className="font-semibold text-lg mt-3">Total: {dinnerTotal}</p>
        </div>
        <div className="w-full border mx-1 border-gray-300">
          <h2 className="text-xl font-semibold">Snacks</h2>
          <div className="h-72 overflow-y-scroll scrollbar">
            {snacks.map((item) => (
              <div className="flex gap-2 py-2 justify-center" key={item.id}>
                <p className="border-r border-black pr-2">{item.name}</p>
                <p className="border-r border-black pr-2">{item.kcals} kcals</p>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    deleteFood(item.id, "snacks", item.kcals);
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <p className="font-semibold text-lg mt-3">Total: {snacksTotal}</p>
        </div>

        <div className="fixed plusButton hover:scale-110 transition-all ease-out cursor-pointer md:hidden right-14 bottom-14">
          <a href="#form">
            {" "}
            <svg
              className="w-20 h-20 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </main>

      <form
        className="myform text-center bg-myDarkBlue border-t border-black text-white"
        onSubmit={handleSubmit}
        id="form"
      >
        <h2 className="text-red-500 pt-5">{errorText}</h2>
        <h2 className="py-5 font-semibold text-lg">Add something</h2>
        <label htmlFor="food" className="font-semibold text-lg">
          Food:{" "}
        </label>

        <input
          className="mb-3 shadow outline-none focus:ring ring-myBlue text-black"
          type="text"
          name="food"
          id="food"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="pls enter exact names!"
        />
        <div className="flex justify-center flex-col">
          <div>
            <input
              type="radio"
              name="dish"
              id="Breakfast"
              value="breakfast"
              onChange={(e) => {
                setDish(e.target.value);
              }}
            />
            <label htmlFor="Breakfast" className="px-1">
              Breakfast
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="dish"
              id="Lunch"
              value="lunch"
              onChange={(e) => {
                setDish(e.target.value);
              }}
            />
            <label htmlFor="Lunch" className="px-1">
              Lunch
            </label>
          </div>
          <div>
            {" "}
            <input
              type="radio"
              name="dish"
              id="Dinner"
              value="dinner"
              onChange={(e) => {
                setDish(e.target.value);
              }}
            />
            <label htmlFor="Dinner" className="px-1">
              Dinner
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="dish"
              id="Snacks"
              value="snacks"
              onChange={(e) => {
                setDish(e.target.value);
              }}
            />
            <label htmlFor="Snacks" className="px-1">
              Snacks
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 my-2 text-myDarkBlue font-bold shadow bg-white focus:shadow-outline hover:bg-myLightBlue transition-all ease-out"
        >
          ADD
        </button>
      </form>
    </div>
  );
}
export async function getServerSideProps() {
  const myKey = process.env.API_KEY;
  return {
    props: {
      myKey,
    },
  };
}
