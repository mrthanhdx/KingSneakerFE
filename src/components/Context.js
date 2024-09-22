import {createContext, useContext,useState} from 'react';

export const GContext = createContext();

export function ContextProvider({children}){
    const [currentUI,setCurrentUI] = useState("ProductDetails");
    const [sellCounterScreen,setSellCounterScreen] = useState("listInvoice");
    const [invoiceDetail,setInvoiceDetail] = useState(null);
    
    


    return (
        <GContext.Provider value={{currentUI,setCurrentUI,sellCounterScreen,setSellCounterScreen,invoiceDetail,setInvoiceDetail}}>
            {children}
        </GContext.Provider>
    )
} 
