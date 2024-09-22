import { useContext } from "react";
import { GContext } from "../Context";

function DetailInvoice({idInvoice}){

    const {sellCounterScreen, setSellCounterScreen} = useContext(GContext);
    return (

        <>
            <h1>
                Invoice : {idInvoice}
            </h1>
            <button onClick={()=>{
                setSellCounterScreen("listInvoice")
            }}>Back to List Invoice</button>
        </>
    )
}

export default DetailInvoice;