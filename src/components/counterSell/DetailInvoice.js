import { useContext } from "react";
import { GContext } from "../Context";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";



function DetailInvoice({ idInvoice }) {
    library.add(fas);
    const { sellCounterScreen, setSellCounterScreen } = useContext(GContext);
    return (
        <>
            <h1>
                Invoice : {idInvoice}
            </h1>
            <button
                style={{ width: "120px", height: "40px", border: "none", borderRadius: "10px", position: "absolute", left: "30px", top: "auto" }}
                onClick={() => {
                    setSellCounterScreen("listInvoice")
                }}
            > <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Back</button>

            <div>
                <FontAwesomeIcon icon="check-square" />
                Your <FontAwesomeIcon icon="coffee" /> is hot and ready!
                
            </div>

            
        </>
    )
}

export default DetailInvoice;