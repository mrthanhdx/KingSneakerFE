
import { useState, useContext } from 'react';
import { GContext } from './Context'
import ProductDetails from "./productManagement/ProductDetails"
import ProductManage from "./productManagement/ProductManage"
import ColorManage from "./propertiesManagement/ColorManage"
import ManuefacturerManage from "./propertiesManagement/ManuefacturerManage"
import BrandManage from "./propertiesManagement/BrandManage"
import SizeManage from "./propertiesManagement/SizeManage"
import StyleManage from "./propertiesManagement/StyleManage"
import CounterSell from './counterSell/CounterSell';
import { ContextProvider } from './Context';

function Container() {
    const { currentUI, setCurrentUI } = useContext(GContext);
    // console.log(currentUI);

    return (

        <>
            {currentUI == "ProductDetails" && <ProductDetails />}
            {currentUI == "ProductManage" && <ProductManage />}
            {currentUI == "ColorManagement" && <ColorManage />}
            {currentUI == "ManuefacturerManagement" && <ManuefacturerManage />}
            {currentUI == "BrandManagement" && <BrandManage />}
            {currentUI == "SizeManagement" && <SizeManage />}
            {currentUI == "StyleManagement" && <StyleManage />}
            {currentUI == "SellAtCounter" &&
                <ContextProvider>
                    <CounterSell/>
                </ContextProvider>

            }


        </>
    )
}
export default Container;