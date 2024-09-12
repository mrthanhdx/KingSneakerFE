import Navbar from "./Navbar";
import  { ContextProvider } from "./Context";
function Content() {
    return (
       <>
        <ContextProvider> 
            <Navbar/>
            
        </ContextProvider>
        </>
      
    )
}

export default Content;