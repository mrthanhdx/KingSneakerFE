import { useContext, useEffect, useState } from "react";
import { GContext } from "../Context";


function ListInvoiceManagement() {

    const { invoiceManagementScreen, setInvoiceManagementScreen, invoiceDetailView, setInvoiceDetailView, setCurrentUI, currentUI } = useContext(GContext);
    const [listInvoice, setListInvoice] = useState([]);


    // console.log(listInvoice);
    const refershListHD = () => {

        const fetchDataListInvoice = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/hoa-don/show-all",
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
    }

    useEffect(() => {
        // console.log(123);

        const fetchDataListInvoice = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/hoa-don/show-all", {
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
    }, [])

    function openInvoiceDetail(idInvoice) {
        setInvoiceDetailView(idInvoice);
        setInvoiceManagementScreen("viewDetailInvoice");
        console.log(123);

    }



    return (
        <>
            <h2 className="text-success">Invoice Management</h2>
            <br></br>
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
                                <th className={invoice.trangThai == 0 ? "text-warning" : "text-success"}>{invoice.trangThai == 0 ? "Hóa Đơn Chờ" : "Đã Thanh Toán"}</th>
                                <th>{invoice.ghiChu}</th>

                                <td>
                                    {invoice.trangThai == 0 ? <>
                                        <button
                                            style={{ marginRight: "10px" }}
                                            className="btn btn-danger"
                                            onClick={() => {
                                                // openInvoiceDetail(invoice.id);
                                            }}>Cancel Invoice</button></>
                                        : ""}
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

export default ListInvoiceManagement;