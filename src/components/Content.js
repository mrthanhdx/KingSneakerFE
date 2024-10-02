import Navbar from "./Navbar";
import  { ContextProvider } from "./Context";
import Container from "./Container";
import LoginForm from "./authen/LogForm";
function Content() {
    return (
       <>
        {/* <ContextProvider> 
            <Navbar/>
            <Container/>
        </ContextProvider> */}
        <ContextProvider>
            <LoginForm/>
        </ContextProvider>
        </>
      
    )
}

export default Content;