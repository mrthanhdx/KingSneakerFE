import { useContext } from "react";
import { GContext } from "../Context";
import ListInvoiceManagement from "./ListInvoiceManagement";
import ViewDetailInvoice from "./ViewDetailInvoice";
function InvoiceManagement() {
    const { invoiceManagementScreen, setInvoiceManagementScreen ,invoiceDetailView} = useContext(GContext);
    return (
        <>
        {console.log(invoiceManagementScreen)
        }
            {invoiceManagementScreen == "listInvoiceManagement" && <ListInvoiceManagement />}
            {invoiceManagementScreen == "viewDetailInvoice" &&
                <ViewDetailInvoice
                    idInvoice={invoiceDetailView}
                />}
        </>
    )
}
export default InvoiceManagement;