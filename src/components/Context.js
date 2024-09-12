import {createContext, useContext,useState} from 'react';
export const GContext = createContext();

export function ContextProvider({children}){
    const [currentUI,setCurrentUI] = useState("ProductDetails");
    

    return (
        <GContext.Provider value={{currentUI,setCurrentUI}}>
            {children}
        </GContext.Provider>
    )
} 
