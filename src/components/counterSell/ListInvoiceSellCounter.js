import { useContext, useEffect, useState } from "react";
import { GContext } from "../Context";


function ListInvoiceSellCounter() {

    const { sellCounterScreen, setSellCounterScreen, invoiceDetail, setInvoiceDetail, setCurrentUI, currentUI } = useContext(GContext);
    const [listInvoice, setListInvoice] = useState([]);

    console.log(listInvoice);

    useEffect(() => {
        console.log(123);

        const fetchDataListInvoice = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/hoa-don/show-all");
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


    return (
        <>
        <h2 className="text-success">List Invoice</h2>
        <br></br>
        <button

        style={{marginRight:"1300px",width:"140px",height:"60px"}}
         className="btn btn-success"
         
         >New Invoice</button>
         <br></br>
         <br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mã HD</th>
                        <th scope="col">Tổng Tiền </th>
                        <th scope="col">Khách Hàng</th>
                        <th scope="col">Nhân Viên Tạo</th>
                        <th scope="col">Ngày Tạo</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Ghi Chú</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {listInvoice.map((invoice) => {
                        console.log(invoice.ngayTao[0]);

                        return (
                            <tr key={invoice.id}>
                                <th scope="row">{invoice.ma}</th>
                                <th>{invoice.tongTien}</th>
                                <th>{invoice.khachHang==null?"Trống":"invoice.khachHang.hoTen"}</th>
                                <th>{invoice.nhanVien.hoTen}</th>
                                <th>{invoice.ngayTao[2] + "/" + invoice.ngayTao[1] + "/" + invoice.ngayTao[0]}</th>
                                <th>{invoice.trangThai}</th>
                                <th>{invoice.ghiChu}</th>

                                <td>
                                <button 
                                style={{marginRight:"10px"}}
                                    className="btn btn-danger"
                                    onClick={() => {
                                        // openInvoiceDetail(invoice.id);
                                    }}>Delete</button>
                                    <button 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        openInvoiceDetail(invoice.id);
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