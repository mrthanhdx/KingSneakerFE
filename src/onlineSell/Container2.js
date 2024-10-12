import { useContext, useState } from "react";
import { GContext2 } from "./Context2";
import ListProduct from "./ListProduct";
import CartInfo from "./CartInfo";



function Container2() {
    const {currentScreen,setCurrentScreen} = useContext(GContext2);
    console.log(currentScreen);
    
return (
    <>
        {currentScreen=="sellOnlineHomePage"&&<ListProduct/>}
        {currentScreen=="cartInfoPage"&&<CartInfo/>}
    </>
)    
}

export default Container2;