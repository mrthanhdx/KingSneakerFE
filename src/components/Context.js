import {createContext, useContext,useState} from 'react';

export const GContext = createContext();

export function ContextProvider({children}){
    const [currentUI,setCurrentUI] = useState("SellAtCounter");
    const [sellCounterScreen,setSellCounterScreen] = useState("listInvoice");
    const [invoiceDetail,setInvoiceDetail] = useState(null);
    const [invoiceDetailView,setInvoiceDetailView] = useState(null);

    const [invoiceManagementScreen,setInvoiceManagementScreen] = useState("listInvoiceManagement");
    


    return (
        <GContext.Provider value={{currentUI,setCurrentUI,sellCounterScreen,setSellCounterScreen,invoiceDetail,setInvoiceDetail,
        invoiceManagementScreen,setInvoiceManagementScreen,invoiceDetailView,setInvoiceDetailView}}>
            {children}
        </GContext.Provider>
    )
} 
