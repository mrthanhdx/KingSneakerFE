import Navbar from "./Navbar";
import  { ContextProvider } from "./Context";
import Container from "./Container";
function Content() {
    return (
       <>
        <ContextProvider> 
            <Navbar/>
            <Container/>
        </ContextProvider>
        </>
      
    )
}

export default Content;