import { createContext, useState, useMemo } from "react";

export const mealContext = createContext();

export const MealProvider = ({ children }) => {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [breakfastTotal, setBreakfastTotal] = useState(0);
  const [lunchTotal, setLunchTotal] = useState(0);
  const [dinnerTotal, setDinnerTotal] = useState(0);
  const [snacksTotal, setSnacksTotal] = useState(0);
  const [dayTotal, setDayTotal] = useState(0);
  const providerValue = useMemo(
    () => ({
      breakfast,
      lunch,
      dinner,
      snacks,
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
    }),
    [
      breakfast,
      lunch,
      dinner,
      snacks,
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
    ]
  );
  return (
    <mealContext.Provider value={providerValue}>
      {children}
    </mealContext.Provider>
  );
};
