import { useContext, useState } from "react";
import { GContext2 } from "./Context2";
import ListProduct from "./ListProduct";
import CartInfo from "./CartInfo";
import ProductDetail from "./ProductDetail";
import UserInfo from "./UserInfo";




function Container2() {
    const {currentScreen,setCurrentScreen,idProduct,productDetaill} = useContext(GContext2);
    console.log(currentScreen);
    
return (
    <>
        {currentScreen=="sellOnlineHomePage"&&<ListProduct/>}
        {currentScreen=="cartInfoPage"&&<CartInfo setCurrentScreen = {setCurrentScreen}/>}
        {currentScreen === "detailProduct" && <ProductDetail product={productDetaill} />}
        {currentScreen==='accountPage' && <UserInfo/>}
    </>
)    
}

export default Container2;