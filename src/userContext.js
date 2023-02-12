import { createContext, useState, useMemo } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [dailyRequirement, setDailyRequirement] = useState(0);
  const [lifts, setLifts] = useState({ bench: 0, deadlift: 0, squat: 0 });
  const [newWeight, setNewWeight] = useState(0);
  const [powerliftingScore, setPowerliftingScore] = useState(0);
  const providerValue = useMemo(
    () => ({
      user,
      setUser,
      dailyRequirement,
      setDailyRequirement,
      lifts,
      setLifts,
      newWeight,
      setNewWeight,
      powerliftingScore,
      setPowerliftingScore,

    }),
    [
      user,
      setUser,
      dailyRequirement,
      setDailyRequirement,
      lifts,
      setLifts,
      newWeight,
      setNewWeight,
      powerliftingScore,
      setPowerliftingScore,

    ]
  );
  return (
    <userContext.Provider value={providerValue}>
      {children}
    </userContext.Provider>
  );
};
