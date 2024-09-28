
import { useState, useContext } from 'react';
import { GContext } from './Context'
import ProductDetails from "./productManagement/ProductDetails"
import ProductManage from "./productManagement/ProductManage"
import ColorManage from "./propertiesManagement/ColorManage"
import ManuefacturerManage from "./propertiesManagement/ManuefacturerManage"
import BrandManage from "./propertiesManagement/BrandManage"
import SizeManage from "./propertiesManagement/SizeManage"
import StyleManage from "./propertiesManagement/StyleManage"
import Merterial from './propertiesManagement/Merterial';
import CounterSell from './counterSell/CounterSell';
import { ContextProvider } from './Context';
import ToastMessage from './toastMessage/ToastMessage';
import ListInvoiceManagement from './invoiceManagement/ListInvoiceManagement';
import InvoiceManagement from './invoiceManagement/InvoiceManagement';
function Container() {
    const { currentUI, setCurrentUI } = useContext(GContext);

    return (

        <>
            {currentUI === "ProductDetails" && <ProductDetails />}
            {currentUI === "ProductManage" && <ProductManage />}
            {currentUI === "ColorManagement" && <ColorManage />}
            {currentUI === "ManuefacturerManagement" && <ManuefacturerManage />}
            {currentUI === "BrandManagement" && <BrandManage />}
            {currentUI === "SizeManagement" && <SizeManage />}
            {currentUI === "StyleManagement" && <StyleManage />}
            {currentUI === "MerterialManagement" && <Merterial/>}
            {currentUI === "InvoiceManagement" && <InvoiceManagement/>}

            {currentUI == "SellAtCounter" &&
                <ContextProvider>
                    <CounterSell/>
                </ContextProvider>

            }


        </>
    )
}
export default Container;