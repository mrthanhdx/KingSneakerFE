import { useContext } from "react";
import { GContext } from "../Context";

function ViewDetailInvoice({idInvoice}){
    const {setInvoiceManagementScreen} = useContext(GContext);
    return (
        <>
        <button className="btn btn-primary" 
        onClick={()=>{
            setInvoiceManagementScreen("listInvoiceManagement");
        }}
        >Back</button>
        <h1>Hello world</h1>
        <h3>{idInvoice}</h3>
        
        </>
    )
}

export default ViewDetailInvoice;