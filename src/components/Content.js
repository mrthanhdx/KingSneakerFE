import Navbar from "./Navbar";
import  { ContextProvider } from "./Context";
import Container from "./Container";
import LoginForm from "./authen/LogForm";
import { useState } from "react";
import HomePage from "../onlineSell/HomePage";
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
          {state=="logout" &&<HomePage setStateForm = {setState}/>}
          {state=="login" &&<LogForm setStateForm = {setState} />}
        </ContextProvider>
        </>
      
    )
}

export default Content;