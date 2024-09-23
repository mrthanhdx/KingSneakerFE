import { useContext, useEffect, useState } from "react";
import { GContext } from "../Context";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";



function DetailInvoice({ idInvoice }) {
    library.add(fas);
    const { sellCounterScreen, setSellCounterScreen } = useContext(GContext);
    const [detailCurrentInvoice, setDetailCurrentInvoice] = useState({});
    console.log(detailCurrentInvoice);


    useEffect(() => {
        const fetchDataDetailInvoice = async () => {
            const response = await fetch(`http://localhost:5050/api/v1/hoa-don/detail/${idInvoice}`);
            const data = await response.json();
            setDetailCurrentInvoice(data);
        }
        fetchDataDetailInvoice();
    }, [])

    return (
        <>
            <div>
                <h1>
                    Invoice : {detailCurrentInvoice.ma}
                </h1>
                <button
                    style={{ width: "140px", height: "50px", border: "none", borderRadius: "10px", position: "absolute", left: "20px", top: "140px", backgroundColor: "var(--bs-info)" }}
                    onClick={() => {
                        setSellCounterScreen("listInvoice")
                    }}
                > <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Back</button>


                <FontAwesomeIcon icon="check-square" />
                Your <FontAwesomeIcon icon="coffee" /> is hot and ready!

            </div>

            <br />
            <div className="row"
            style={{justifyContent:"center"}}
            >
                <div className="cart col-6"
                    style={{ minHeight: "600px", backgroundColor: "var(--bs-info-bg-subtle)", marginRight: "30px" }}
                >

                </div>

                <div className="invoiceInfomation col-4"
                    style={{ minHeight: "600px", backgroundColor: "var(	--bs-success-bg-subtle)", marginLeft: "50px" }}

                >
                </div>

            </div>

        </>
    )
}

export default DetailInvoice;