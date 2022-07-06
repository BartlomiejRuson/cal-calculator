
import {createContext, useState,useMemo} from 'react'

export const userContext = createContext();

export const UserProvider = ({children}) =>{
    const[user,setUser]=useState({})
    const[dailyRequirement,setDailyRequirement]=useState(0)
    const providerValue = useMemo(()=>({user,setUser,dailyRequirement,setDailyRequirement}),[user,setUser,dailyRequirement,setDailyRequirement]);
    return(
        <userContext.Provider value={providerValue}>
        {children}
    </userContext.Provider>

    )
    }


