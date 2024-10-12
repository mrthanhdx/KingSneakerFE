import { useEffect, useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ListProduct from "./ListProduct";
import { ContextProvider2 } from "./Context2";
import Container2 from "./Container2";

function SellOnlineHomePage({ setStateForm }) {


    return (
        <>
            <ContextProvider2>
                <Header setStateForm={setStateForm} />
                <Container2 />
            </ContextProvider2>



            {/* <ProductDetail/> */}
        </>
    );
}

export default SellOnlineHomePage;
