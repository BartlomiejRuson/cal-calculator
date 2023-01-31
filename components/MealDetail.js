import React, { useContext } from "react";
import { mealContext } from "../src/mealContext";
function MealDetail({ data, dish }) {
  const {
    breakfastTotal,
    lunchTotal,
    dinnerTotal,
    snacksTotal,
    dayTotal,
    setBreakfast,
    setLunch,
    setDinner,
    setSnacks,
    setBreakfastTotal,
    setLunchTotal,
    setDayTotal,
    setDinnerTotal,
    setSnacksTotal,
  } = useContext(mealContext);
  const deleteFood = (id, dish, kcals) => {
    switch (dish) {
      case "breakfast":
        const newBreakfast = data.filter((item) => {
          return item.id != id;
        });
        setBreakfast(newBreakfast);
        setBreakfastTotal(breakfastTotal - kcals);
        setDayTotal(dayTotal - kcals);
        break;
      case "lunch":
        const newLunch = data.filter((item) => {
          return item.id != id;
        });
        setLunch(newLunch);
        setLunchTotal(lunchTotal - kcals);
        setDayTotal(dayTotal - kcals);
        break;
      case "dinner":
        const newDinner = data.filter((item) => {
          return item.id != id;
        });
        setDinner(newDinner);
        setDinnerTotal(dinnerTotal - kcals);
        setDayTotal(dayTotal - kcals);
        break;
      case "snacks":
        const newSnacks = data.filter((item) => {
          return item.id != id;
        });
        setSnacks(newSnacks);
        setSnacksTotal(snacksTotal - kcals);
        setDayTotal(dayTotal - kcals);
        break;
      default:
    }
  };
  return (
    <div className="h-72 overflow-y-scroll scrollbar">
      {data.map((item) => (
        <div
          className="flex gap-2 my-1  py-2 max-h-full justify-center "
          key={item.id}
        >
          <p className="border-r border-black pr-2">{item.name}</p>
          <p className="border-r border-black pr-2">{item.kcals} kcals</p>
          <div
            className="cursor-pointer"
            onClick={() => {
              deleteFood(item.id, dish, item.kcals);
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
  );
}

export default MealDetail;
