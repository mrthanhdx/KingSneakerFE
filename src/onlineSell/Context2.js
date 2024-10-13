import {createContext, useContext,useState} from 'react';

export const GContext2 = createContext();

export function ContextProvider2({ children }) {
    const [currentScreen, setCurrentScreen] = useState("sellOnlineHomePage");
    const [idProduct, setIdProduct] = useState(null);
    const [productDetaill,setProductDetail] = useState(null);

    const showProductDetail = async(id) => {
        const res = await fetch(`http://localhost:5050/api/v1/chi-tiet-san-pham/detail/${id}`)
        const data =await res.json();
        setProductDetail(data);
        setCurrentScreen("detailProduct");
    };

    return (
        <GContext2.Provider value={{ currentScreen, setCurrentScreen, idProduct, showProductDetail,productDetaill }}>
            {children}
        </GContext2.Provider>
    );
}
