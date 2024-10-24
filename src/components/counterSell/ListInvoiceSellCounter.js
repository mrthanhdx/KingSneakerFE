import { useContext, useEffect, useState } from "react";
import { GContext } from "../Context";
import { toastError, toastInfo, toastSuccess, toastWarning } from "../toastMessage/ToastMessage";


function ListInvoiceSellCounter() {

    const { sellCounterScreen, setSellCounterScreen, invoiceDetail, setInvoiceDetail, setCurrentUI, currentUI } = useContext(GContext);
    const [listInvoice, setListInvoice] = useState([]);


    // console.log(listInvoice);
    const refershListHD = () => {

        const fetchDataListInvoice = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/hoa-don/show-listInvoice-counter",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                setListInvoice(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchDataListInvoice();
    }

    useEffect(() => {
        // console.log(123);

        const fetchDataListInvoice = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/hoa-don/show-listInvoice-counter",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                const data = await response.json();
                setListInvoice(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchDataListInvoice();
    }, [])

    function openInvoiceDetail(idInvoice) {
        setSellCounterScreen("detailInvoice");
        setInvoiceDetail(idInvoice);
    }

    const createNewHoaDon = () => {
        let newHD = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/hoa-don/new-hoa-don", {
                    method: "POST",
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.text();
                console.log(data);
                refershListHD();

            } catch (err) {
                console.error(err);
            }
        }
        newHD();

    }
    const cancelInvoice = (idInvoice) => {
        let callAPI = async () => {
            try {
                const response = await fetch(`http://localhost:5050/admin/api/v1/hoa-don/cancel-hoa-don/${idInvoice}`, {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    },
                    method: "PUT"
                });
                const data = await response.text();
                if (response.status == 200) {
                    toastSuccess("Success", data);
                } else {
                    toastError("failed", data);
                }
                refershListHD();

            } catch (err) {
                console.error(err);
            }
        }
        callAPI();
    }

    return (
        <>

            <div id="toast-root"></div>
            <h2 className="text-success">Sell in counter</h2>
            <br></br>
            <br></br>

            <button
                style={{ marginRight: "1600px", width: "140px", height: "60px" }}
                className="btn btn-success"
                onClick={() => {
                    const isConfirm = window.confirm("are you sure to create a new invoice ?");
                    if (isConfirm) {
                        createNewHoaDon();
                        toastSuccess("Success","Create new Invoice Successfully !")
                    }
                }}
            >New Invoice</button>
            <br></br>
            <br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mã HD</th>
                        <th scope="col">Nhân Viên Tạo</th>
                        <th scope="col">Ngày Tạo</th>
                        <th scope="col">Khách Hàng</th>
                        <th scope="col">Tổng Tiền </th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Ghi Chú</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {listInvoice.map((invoice) => {
                        // console.log(invoice.ngayTao[0]);

                        return (
                            <tr key={invoice.id}>
                                <th scope="row">{invoice.ma}</th>
                                <th>{invoice.nhanVien.hoTen}</th>
                                <th>{invoice.ngayTao[2] + "/" + invoice.ngayTao[1] + "/" + invoice.ngayTao[0]}</th>
                                <th>{invoice.khachHang == null ? "Trống" : invoice.khachHang.hoTen}</th>
                                <th>{invoice.tongTien}</th>
                                <th>{invoice.trangThai == 0 ? "Hóa Đơn Chờ" : "Đã Thanh Toán"}</th>
                                <th>{invoice.ghiChu}</th>

                                <td>
                                    <button
                                        style={{ marginRight: "10px" }}
                                        className="btn btn-danger"
                                        onClick={() => {
                                            let confirm = window.confirm("are you sure to cancel this invoice ?")
                                            if (confirm) {
                                                cancelInvoice(invoice.id)
                                            }
                                        }}>Cancel Invoice</button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            let confirm = window.confirm("are you sure to open detail this invoice ?")
                                            if (confirm) {
                                                openInvoiceDetail(invoice.id);
                                            }
                                        }}>Detail</button>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>

            <br></br>




        </>
    )
}

export default ListInvoiceSellCounter;