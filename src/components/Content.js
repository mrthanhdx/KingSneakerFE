import Navbar from "./Navbar";
import  { ContextProvider } from "./Context";
import Container from "./Container";
import LoginForm from "./authen/LogForm";
import { useState } from "react";
import NavigationPage from "../onlineSell/NavigationPage";
import LogForm from "./authen/LogForm";

function Content() {
    const [state,setState] = useState("logout");
    
    return (
       <>
        {/* <ContextProvider> 
            <Navbar/>
            <Container/>
        </ContextProvider> */}
        <ContextProvider>
          {state=="logout" &&<NavigationPage setStateForm = {setState}/>}
          {state=="login" &&<LogForm setStateForm = {setState} />}
        </ContextProvider>
        </>
      
    )
}

export default Content;