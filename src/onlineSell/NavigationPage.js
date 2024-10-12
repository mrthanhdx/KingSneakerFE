import { useEffect, useState } from "react";
import { ContextProvider } from "../components/Context";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import SellOnlineHomePage from "./SellOnlineHomePage";


function NavigationPage({ setStateForm }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData != null) {
            setUser(JSON.parse(userData));
        }
    }, [])


    return (
        <>
            {user != null && user.role == "ROLE_ADMIN" &&
                <ContextProvider>
                    <Navbar setStateForm={setStateForm} />
                    <Container />
                </ContextProvider>}
            {user == null && <SellOnlineHomePage
                setStateForm={setStateForm}
            /> ||
                user != null && user.role == "ROLE_CUSTOMER" &&
                <SellOnlineHomePage
                    setStateForm={setStateForm}
                />}
        </>
    )
}

export default NavigationPage;