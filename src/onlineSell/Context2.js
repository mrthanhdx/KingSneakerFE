import {createContext, useContext,useState} from 'react';

export const GContext2 = createContext();

export function ContextProvider2({children}){
    const [currentScreen,setCurrentScreen] = useState("sellOnlineHomePage");
   
    


    return (
        <GContext2.Provider value={{currentScreen,setCurrentScreen}}>
            {children}
        </GContext2.Provider>
    )
} 
