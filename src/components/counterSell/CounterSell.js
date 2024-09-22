import { useContext } from "react";
import { GContext } from "../Context";
import DetailInvoice from "./DetailInvoice";
import ListInvoiceSellCounter from "./ListInvoiceSellCounter";

function CounterSell() {
    const { sellCounterScreen, setSellCounterScreen,invoiceDetail,setInvoiceDetail,setCurrentUI,currentUI } = useContext(GContext);

    
   
    return (
        <>
            {sellCounterScreen == "listInvoice" && <ListInvoiceSellCounter/>}
            {sellCounterScreen == "detailInvoice" &&
                <DetailInvoice
                idInvoice = {invoiceDetail}
            />}
        </>
    )
}

export default CounterSell;